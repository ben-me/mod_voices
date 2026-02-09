import { form, getRequestEvent } from "$app/server";
import { auth } from "$lib/server/auth";

export const log_out = form(async () => {
  await auth.api.signOut({
    headers: getRequestEvent().request.headers,
  });
});
