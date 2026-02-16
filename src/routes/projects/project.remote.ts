import { form } from "$app/server";
import {
  create_new_project,
  get_user_from_session,
} from "$lib/server/db/operations";
import { project_create_schema } from "$lib/utilities/validation-schemas";
import { error, fail } from "@sveltejs/kit";

export const create_project = form(
  project_create_schema,
  async ({ title, description, voiceDescriptions, image }) => {
    const userId = await get_user_from_session();
    if (!userId) {
      error(404);
    }

    try {
      create_new_project({
        userId,
        title,
        description,
        voiceDescriptions,
        image,
      });
    } catch (e) {
      const error = e as Error;
      fail(404, { message: error.message });
    }
  },
);
