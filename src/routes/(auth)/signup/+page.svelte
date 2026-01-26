<script lang="ts">
  import { resolve } from "$app/paths";
  import { m } from "$lib/paraglide/messages.js";
</script>

<svelte:head>
  <title>{m.signup()} - ModVoices</title>
</svelte:head>

<div>
  <form action="">
    <h2>Registrieren</h2>
    <label>
      <span>{m.username()}:</span>
      <input type="text" name="user" />
    </label>
    <label>
      <span>{m.email()}:</span>
      <input type="email" name="email" />
    </label>
    <label>
      <span>{m.password()}:</span>
      <input type="password" name="password" />
    </label>
    <div>
      <a href={resolve("/login")} class="btn ghost">{m.login()}</a>
      <button class="btn">{m.signup()}</button>
    </div>
  </form>
</div>

<style>
  div {
    padding-inline: 0.5rem;

    @media (--above-sm) {
      padding-inline: 0;
    }
  }

  form {
    background-color: var(--c-black-3);
    margin-inline: auto;
    margin-block: 3.25rem;
    display: flex;
    flex-direction: column;
    max-width: 30em;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
    border-radius: var(--br-1);

    h2 {
      text-align: center;
      color: var(--c-gold);
    }

    @media (--above-sm) {
      padding: 2rem 3rem;
    }

    div {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: 1rem;

      @media (--above-sm) {
        flex-direction: row;
        justify-content: space-around;
        gap: 0;
      }
    }
  }

  input {
    display: block;
    width: 100%;
    margin-block-start: 0.25rem;
    background-color: var(--c-white);
    padding: 0.25rem;
    color: var(--c-black);
    border-radius: var(--br-1);
  }
</style>
