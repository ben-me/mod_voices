<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import { slide } from "svelte/transition";
  import Link from "./Link.svelte";
  import { LINKS } from "$lib/utilities/links";

  let menu_is_open = $state(false);
</script>

<div class="mobile">
  <button
    aria-label={m.nav_open_sidebar()}
    onclick={() => (menu_is_open = !menu_is_open)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      {#if !menu_is_open}
        <path d="M21 18H3v-2h18v2Zm0-5H3v-2h18v2Zm0-5H3V6h18v2Z" />
      {:else}
        <path
          d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
        />
      {/if}
    </svg>
  </button>
  {#if menu_is_open}
    <div in:slide={{ duration: 250 }} class="menu">
      <nav>
        <ul>
          {#each LINKS as link (link.href)}
            <li>
              <Link href={link.href} onclick={() => (menu_is_open = false)}>
                {link.label}
              </Link>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  {/if}
</div>

<style>
  .mobile {
    @media (--above-md) {
      display: none;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: none;
    background-color: var(--c-black-2);

    nav {
      width: 100%;
      height: 100%;
      border-block-start: 2px solid var(--c-black-3);
      border-bottom: 2px solid var(--c-black-3);

      ul {
        display: grid;
        justify-content: stretch;
      }

      li {
        text-align: end;
        padding: 1rem;

        :global(a) {
          font-size: var(--fs-1);
        }

        &:hover {
          background-color: var(--c-black-4);
        }
      }

      div {
        display: flex;
        justify-content: end;
      }
    }
  }

  svg {
    width: 2.5rem;
    height: auto;
    fill: var(--c-white);
  }
</style>
