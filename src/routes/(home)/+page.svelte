<script lang="ts">
  import { resolve } from "$app/paths";
  import hero from "$lib/assets/hero.jpg";
  import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
  <title>{m.homeTitle()} - ModVoices</title>
</svelte:head>

<div class="hero">
  <img
    src={hero}
    alt={m.heroAltText()}
    class="hero__image"
    width="3453"
    height="1440"
  />
  <div class="hero__texts">
    <h2>
      {m.intro()}
    </h2>
    <div class="hero__buttons">
      <a href={resolve("/projects")} class="btn-primary">{m.findProject()}</a>
      <a href={resolve("/login")} class="btn-secondary">
        {m.offerVoice()}
      </a>
    </div>
  </div>
</div>

<style>
  .hero {
    position: relative;
    height: 100%;

    img {
      position: absolute;
      inset: 0;
      height: 100%;
      max-height: 100%;
      object-fit: cover;
      opacity: 55%;
    }
  }

  .hero__texts {
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
        0px 1px 2px var(--c-black),
        0px 3px 2px var(--c-black),
        0px 4px 8px var(--c-black);
    }
  }

  .hero__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    @media (--above-sm) {
      flex-direction: row;
    }
  }
</style>
