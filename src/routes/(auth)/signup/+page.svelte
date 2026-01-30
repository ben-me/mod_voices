<script lang="ts">
  import { resolve } from "$app/paths";
  import { m } from "$lib/paraglide/messages.js";
  import { sign_up } from "./signup.remote";
  import Input from "$lib/components/Input.svelte";
  import { user_create_schema } from "$lib/utilities/validation-schemas";
</script>

<svelte:head>
  <title>{m.signup()} - ModVoices</title>
</svelte:head>

<form
  {...sign_up.preflight(user_create_schema)}
  oninput={() => sign_up.validate()}
>
  <h2>{m.signupHeading()}</h2>
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
      {m.accountExists()}
      <a href={resolve("/login")}>{m.signupHere()}</a>
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

      span {
        display: contents;
        color: red;
      }
    }

    h2 {
      text-align: center;
      font-size: var(--fs-3);
    }

    div {
      margin-block-start: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      text-align: center;

      a {
        display: inline;
        color: dodgerblue;
        text-decoration: initial;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
