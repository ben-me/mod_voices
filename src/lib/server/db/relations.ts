import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    twoFactors: r.many.twoFactor(),
    projectListings: r.many.projectListing(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  twoFactor: {
    user: r.one.user({
      from: r.twoFactor.userId,
      to: r.user.id,
    }),
  },
  projectListing: {
    user: r.one.user({
      from: r.projectListing.userId,
      to: r.user.id,
      optional: false,
    }),
    voiceDescription: r.many.voiceDescription(),
  },
  voiceDescription: {
    projectListing: r.one.projectListing({
      from: r.voiceDescription.projectId,
      to: r.projectListing.id,
      optional: false,
    }),
  },
}));
