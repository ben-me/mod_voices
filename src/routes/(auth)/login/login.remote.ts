import { form } from "$app/server";
import { auth } from "$lib/server/auth";
import { login_user_schema } from "$lib/utilities/validation-schemas";
import { invalid } from "@sveltejs/kit";
import type { APIError } from "better-auth";

export const log_in = form(login_user_schema, async ({ email, _password }) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password: _password,
      },
    });
  } catch (error) {
    const login_error = error as APIError;
    if (login_error.status === "UNAUTHORIZED") {
      invalid("Invalid email or password.");
    }
  }
});
