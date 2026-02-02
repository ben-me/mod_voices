import { form } from "$app/server";
import { auth } from "$lib/server/auth";
import { get_user } from "$lib/server/db";
import { user_create_schema } from "$lib/utilities/validation-schemas";
import { invalid } from "@sveltejs/kit";
import type { APIError } from "better-auth";

export const sign_up = form(
  user_create_schema,
  async ({ name, email, _password }, issue) => {
    const user_exists = await get_user(name);
    if (user_exists) {
      invalid(issue.name("Username already taken"));
    }
    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password: _password,
        },
      });
    } catch (error) {
      const registration_error = error as APIError;
      if (
        registration_error?.body?.code ===
        "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
      ) {
        invalid(issue.email("Email is already taken"));
      }
    }
  },
);
