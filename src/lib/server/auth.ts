import { getRequestEvent } from "$app/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { db } from "./db";
import { env } from "$env/dynamic/private";
import { admin, twoFactor } from "better-auth/plugins";
import {
  account,
  session,
  twoFactor as twoFactorTable,
  user,
  verification,
} from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
      twoFactor: twoFactorTable,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [sveltekitCookies(getRequestEvent), admin(), twoFactor()],
  secret: env.BETTER_AUTH_SECRET,
});
