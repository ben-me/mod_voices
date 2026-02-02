<script lang="ts">
  import { resolve } from "$app/paths";
  import hero from "$lib/assets/hero.jpg";
  import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
  <title>{m.homeTitle()} - ModVoices</title>
</svelte:head>

<img
  src={hero}
  alt={m.heroAltText()}
  class="hero-image"
  width="3453"
  height="1440"
/>
<div class="hero">
  <div class="hero-texts">
    <h2>
      {m.intro()}
    </h2>
    <div class="hero-buttons">
      <a href={resolve("/projects")} class="btn">{m.discoverProject()}</a>
      <a href={resolve("/login")} class="btn outline">
        {m.offerVoice()}
      </a>
    </div>
  </div>
</div>

<style>
  img {
    position: absolute;
    inset: 0;
    height: 100dvh;
    object-fit: cover;
    opacity: 0.7;
  }

  .hero {
    color-scheme: dark;
    color: var(--c-fg);
    position: relative;
    height: 100%;
  }

  .hero-texts {
    position: absolute;
    inset: 0;
    display: grid;
    gap: 1rem;
    width: 75%;
    height: max-content;
    place-items: center;
    margin: auto;

    h2 {
      text-align: center;
      font-family: var(--f-meta);
      max-width: 30ch;
      text-shadow:
        0 1px 2px var(--c-black),
        0 3px 2px var(--c-black),
        0 4px 8px var(--c-black);
    }
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    @media (--above-sm) {
      flex-direction: row;
    }
  }
</style>
