<script lang="ts">
  import { log_out } from "../routes/(auth)/logout.remote";
  import Link from "./components/Link.svelte";
  import MobileNavigation from "./components/MobileNavigation.svelte";
  import { m } from "./paraglide/messages";

  const { user } = $props();
</script>

<header>
  <div>
    <h1>
      <Link href="/">
        <span>Mod</span>Voices
      </Link>
    </h1>
    <nav>
      <ul>
        <li>
          <Link href="/projects" class="header-link">
            {m.nav_projects()}
          </Link>
        </li>
        <li>
          <Link href="/voices" class="header-link">{m.nav_voice_actors()}</Link>
        </li>

        {#if !user}
          <li>
            <Link href="/signup">{m.signup()}</Link>
          </li>
          <li>
            <Link href="/login" class="btn tertiary">
              {m.login()}
            </Link>
          </li>
        {:else}
          <li>
            <form {...log_out}>
              <button class="btn ghost">{m.logout()}</button>
            </form>
          </li>
        {/if}
      </ul>
    </nav>
    <MobileNavigation />
  </div>
</header>

<style>
  header {
    position: relative;
    color-scheme: dark;
    background-color: var(--c-black-2);
    z-index: 10;
    padding-inline: 0.5rem;
    border-bottom: 2px solid var(--c-black-3);

    h1 {
      :global(a) {
        font-size: var(--fs-3);
        text-decoration: none;
        color: var(--c-white);
        padding-block: 0.75rem;

        @media (--above-md) {
          font-size: var(--fs-2);
          padding-block: 0;
        }

        span {
          color: var(--c-gold);
        }
      }
    }

    .btn {
      color: var(--c-red);
      background-color: transparent;

      &:hover {
        color: hsl(from var(--c-red) h s 45%);
      }
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: min(80rem, 100%);
      margin-inline: auto;

      nav {
        display: none;

        @media (--above-md) {
          display: block;
        }

        ul {
          display: flex;
          align-items: center;
        }

        :global(a) {
          padding-inline: 1rem;
        }

        :global(.header-link) {
          color: var(--c-white);
          padding-block: 1rem;
          transition: background-color 0.2s ease;
        }

        :global(.header-link):hover {
          background-color: var(--c-black-4);
        }
      }
    }
  }
</style>
