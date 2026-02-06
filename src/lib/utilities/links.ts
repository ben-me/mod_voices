import type { Pathname } from "$app/types";
import { m } from "$lib/paraglide/messages";
import type { LocalizedString } from "@inlang/paraglide-js";

type Link = {
  label: LocalizedString;
  href: Pathname;
};
export const LINKS: Link[] = [
  { label: m.voice_actors(), href: "/voices" },
  { label: m.projects(), href: "/projects" },
  { label: m.login(), href: "/login" },
  { label: m.signup(), href: "/signup" },
];
