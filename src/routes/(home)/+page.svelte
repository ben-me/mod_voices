<script lang="ts">
  import hero from "$lib/assets/hero.jpg";
  import Link from "$lib/components/Link.svelte";
  import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
  <title>{m.title_home()} - ModVoices</title>
</svelte:head>

<div class="hero">
  <img
    src={hero}
    alt={m.home_hero_alt()}
    class="hero-image"
    width="3453"
    height="1440"
  />
  <div class="hero-texts">
    <h2>
      {m.home_intro()}
    </h2>
    <div class="hero-buttons">
      <Link href="/projects" class="btn">
        {m.home_discover_projects()}
      </Link>
      <Link href="/login" class="btn outline">
        {m.home_offer_voice()}
      </Link>
    </div>
  </div>
</div>

<style>
  .hero {
    color-scheme: dark;
    background-color: var(--c-bg);
    height: 100%;

    img {
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
    }
  }

  .hero-texts {
    color: var(--c-white);
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
