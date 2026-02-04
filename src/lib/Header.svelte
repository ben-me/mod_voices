<script lang="ts">
  import Link from "./components/Link.svelte";
  import { m } from "./paraglide/messages";
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
        <li>
          <Link href="/signup" class="btn ghost">{m.signup()}</Link>
        </li>
        <li>
          <Link href="/login" class="btn secondary ghost">
            {m.login()}
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    color-scheme: dark;
    background-color: var(--c-black-2);
    z-index: 1;
    padding-inline: 1rem;
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
