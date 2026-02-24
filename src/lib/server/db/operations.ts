import { getRequestEvent } from "$app/server";
import { auth } from "../auth";

export async function get_user_from_session() {
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  return session?.user.id;
}
