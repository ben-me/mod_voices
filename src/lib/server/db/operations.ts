import { getRequestEvent } from "$app/server";
import type { ProjectInput } from "$lib/utilities/validation-schemas";
import { db } from ".";
import { auth } from "../auth";
import { projectListing, voiceDescription } from "./schema";

export async function get_user_from_session() {
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  return session?.user.id;
}

export async function get_user_by_name(username: string) {
  const user = await db.query.user.findFirst({
    where: {
      name: username,
    },
  });
  return user;
}

export async function create_new_project({
  title,
  voiceDescriptions,
  description,
  userId,
  image,
}: Omit<ProjectInput, "image"> & { image: string; userId: string }) {
  const project_response = await db
    .insert(projectListing)
    .values({ title, description, userId, active: true, image })
    .returning({ projectId: projectListing.id });

  await Promise.all(
    voiceDescriptions.map(async (voice) => {
      await db.insert(voiceDescription).values({
        projectId: project_response[0].projectId,
        ...voice,
      });
    }),
  );
}

export async function get_project_by_name(project_name: string) {
  const project = await db.query.projectListing.findFirst({
    where: {
      title: project_name,
    },
  });

  return project;
}
