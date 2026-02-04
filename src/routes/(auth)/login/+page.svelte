<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import * as m from "$lib/paraglide/messages";
  import { login_user_schema } from "$lib/utilities/validation-schemas";
  import { useDebounce } from "runed";
  import { log_in } from "./login.remote";
  import { onMount } from "svelte";
  import Link from "$lib/components/Link.svelte";

  const login_validation = useDebounce(log_in.validate, 350);

  onMount(() => {
    if (log_in.fields.allIssues()) {
      log_in.validate();
    }
  });
</script>

<svelte:head>
  <title>{m.title_login()} - ModVoices</title>
</svelte:head>

<form
  {...log_in.preflight(login_user_schema)}
  oninput={() => login_validation()}
>
  <h2>{m.title_login()}</h2>
  <label>
    {m.email()}:
    <Input
      {...log_in.fields.email.as("email")}
      inputIssues={log_in.fields.email.issues()}
    />
  </label>
  <label>
    {m.password()}:
    <Input
      {...log_in.fields._password.as("password")}
      inputIssues={log_in.fields._password.issues()}
    />
  </label>
  {#each log_in.fields.allIssues() as issue (issue.message)}
    {#if issue.path.length === 0}
      <p>{issue.message}</p>
    {/if}
  {/each}
  <div>
    <button class="btn">
      {m.login()}
    </button>
    <p>
      {m.login_no_account()}
      <Link href="/signup">{m.login_signup_link()}</Link>
    </p>
  </div>
</form>

<style>
  form {
    background-color: light-dark(var(--c-white), var(--c-black-3));
    margin-inline: auto;
    margin-block: 1rem;
    display: flex;
    flex-direction: column;
    max-width: 25em;
    gap: 1rem;
    padding: 1.5rem 2rem 2rem;
    border-radius: var(--br-1);

    label {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    h2 {
      text-align: center;
      font-size: var(--fs-3);
    }

    > p {
      color: red;
    }

    div {
      margin-block-start: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      text-align: center;

      :global(a) {
        display: inline;
        color: dodgerblue;
        text-decoration: initial;
      }

      :global(a):hover {
        text-decoration: underline;
      }
    }
  }
</style>
