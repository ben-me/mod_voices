import { getRequestEvent } from "$app/server";
import { db } from ".";
import { auth } from "../auth";

export async function get_user_from_session() {
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  return {
    user: session?.user.id,
  };
}

export async function get_user_by_name(
  username: string,
): Promise<{ name: string } | undefined> {
  const user = await db.query.user.findFirst({
    where: {
      name: username,
    },
  });
  return user;
}
