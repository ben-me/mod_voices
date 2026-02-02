import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/node-postgres";
import { user } from "./schema";
import { eq } from "drizzle-orm";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export const db = drizzle(env.DATABASE_URL);

export async function get_user(
  username: string,
): Promise<{ name: string } | undefined> {
  const users = await db.select().from(user).where(eq(user.name, username));
  return users[0];
}
