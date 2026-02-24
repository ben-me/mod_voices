import { form, query } from "$app/server";
import { get_user_from_session } from "$lib/server/db/operations";
import { project_create_schema } from "$lib/utilities/validation-schemas";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { error, invalid } from "@sveltejs/kit";
import {
  R2_ENDPOINT_URL,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
} from "$env/static/private";
import { m } from "$lib/paraglide/messages";
import { db } from "$lib/server/db";
import * as v from "valibot";
import { projectListing, voiceDescription } from "$lib/server/db/schema";

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT_URL,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export const get_project_by_name = query(v.string(), async (name: string) => {
  return await db.query.projectListing.findFirst({
    where: {
      title: name,
    },
  });
});

export const create_project = form(
  project_create_schema,
  async ({ title, description, voiceDescriptions, image }, issue) => {
    const userId = await get_user_from_session();
    if (!userId) {
      error(404);
    }

    const project_title_exists = await get_project_by_name(title);

    if (project_title_exists) {
      invalid(issue.title(m.new_project_title_exists()));
    }

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: image.name,
          Body: new Uint8Array(await image.arrayBuffer()),
          ContentType: image.type,
        }),
      );

      const project_response = await db
        .insert(projectListing)
        .values({ title, description, userId, active: true, image: image.name })
        .returning({ projectId: projectListing.id });

      await Promise.all(
        voiceDescriptions.map(async (voice) => {
          await db.insert(voiceDescription).values({
            projectId: project_response[0].projectId,
            ...voice,
          });
        }),
      );
    } catch (e) {
      console.error(e as Error);
      error(500, { message: "An unexpected Error happend." });
    }
  },
);

export const get_projects = query(async (cursor?: number, page_size = 20) => {
  return await db.query.projectListing.findMany({
    limit: page_size,
    offset: cursor,
    with: {
      voiceDescription: true,
    },
    orderBy: {
      id: "asc",
    },
  });
});
