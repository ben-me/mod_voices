<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";
  import { localizeHref } from "$lib/paraglide/runtime";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  const { href, children, ...rest }: HTMLAnchorAttributes = $props();

  const resolvedHref = $derived(
    href ? resolve(localizeHref(href) as Pathname) : undefined,
  );
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={resolvedHref} {...rest}>
  {@render children?.()}
</a>
