<script lang="ts">
  import { resolve } from "$app/paths";
  import { m } from "./paraglide/messages";
</script>

<header>
  <div>
    <h1>
      <a href={resolve("/")}><span>Mod</span>Voices</a>
    </h1>
    <nav>
      <ul>
        <li>
          <a href={resolve("/projects")} class="header-link">
            {m.modProjects()}
          </a>
        </li>
        <li>
          <a href={resolve("/voices")} class="header-link">{m.voiceActors()}</a>
        </li>
        <li>
          <a href={resolve("/signup")} class="btn ghost">{m.signup()}</a>
        </li>
        <li>
          <a href={resolve("/login")} class="btn secondary ghost">{m.login()}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    color-scheme: dark;
    background-color: var(--c-bg);
    z-index: 1;
    padding-inline: 0.5rem;

    h1 {
      a {
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

        a {
          padding-inline: 1rem;
        }

        .header-link {
          padding-block: 1rem;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: var(--c-black-4);
          }
        }
      }
    }
  }
</style>
