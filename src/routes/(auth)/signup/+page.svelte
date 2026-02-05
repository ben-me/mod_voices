<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import { sign_up } from "./signup.remote";
  import Input from "$lib/components/Input.svelte";
  import { user_create_schema } from "$lib/utilities/validation-schemas";
  import { onMount } from "svelte";
  import Link from "$lib/components/Link.svelte";

  onMount(() => {
    if (sign_up.fields.allIssues()) {
      sign_up.validate();
    }
  });
</script>

<svelte:head>
  <title>{m.title_signup()} - ModVoices</title>
</svelte:head>

<div class="wrapper">
  <form
    {...sign_up.preflight(user_create_schema)}
    oninput={() => sign_up.validate()}
  >
    <h2>{m.signup_form_heading()}</h2>
    <label>
      {m.username()}: <span>*</span>
      <Input
        {...sign_up.fields.name.as("text")}
        inputIssues={sign_up.fields.name.issues()}
      />
    </label>
    <label>
      {m.email()}: <span>*</span>
      <Input
        {...sign_up.fields.email.as("email")}
        inputIssues={sign_up.fields.email.issues()}
      />
    </label>
    <label>
      {m.password()}: <span>*</span>
      <Input
        {...sign_up.fields._password.as("password")}
        inputIssues={sign_up.fields._password.issues()}
      />
    </label>
    <div>
      <button class="btn">
        {m.signup()}
      </button>
      <p>
        {m.signup_account_exists()}
        <Link href="/login">{m.signup_login_link()}</Link>
      </p>
    </div>
  </form>
</div>

<style>
  form {
    background-color: light-dark(var(--c-white-9), var(--c-black-2));
    display: flex;
    margin-inline: auto;
    flex-direction: column;
    max-width: 25em;
    gap: 1rem;
    margin-block-start: 0.5rem;
    padding: 1.5rem 2rem 2rem;

    label {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-weight: 600;

      span {
        display: contents;
        color: red;
      }
    }

    h2 {
      text-align: center;
      font-size: var(--fs-1);
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
