import { form } from "$app/server";
import { auth } from "$lib/server/auth";
import { user_create_schema } from "$lib/utilities/validation-schemas";

export const sign_up = form(
  user_create_schema,
  async ({ name, email, _password }) => {
    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password: _password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
);
