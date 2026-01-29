<script lang="ts" generics="T">
  import type { RemoteFormIssue } from "@sveltejs/kit";
  import { useDebounce } from "runed";
  import type { HTMLInputAttributes } from "svelte/elements";
  import * as v from "valibot";

  type Props = {
    validateOn: v.GenericSchema<T>;
    issues?: RemoteFormIssue[] | undefined;
  } & HTMLInputAttributes;

  const { validateOn, issues, ...rest }: Props = $props();
  let value = $state("");
  let inputIssues: RemoteFormIssue[] | v.BaseIssue<unknown>[] | undefined =
    $derived(issues);

  const validate_input = useDebounce(() => {
    if (value === "") {
      inputIssues = undefined;
      return;
    }
    try {
      v.parse(validateOn, value);
      inputIssues = undefined;
    } catch (error) {
      const validation_error = error as v.ValiError<typeof validateOn>;
      inputIssues = validation_error.issues;
    }
  }, 350);
</script>

<input
  {...rest}
  oninput={validate_input}
  data-input-state={inputIssues && inputIssues.length > 0 ? "error" : null}
  aria-invalid={inputIssues && inputIssues.length > 0}
  bind:value
/>
{#if inputIssues}
  <ul role="list">
    {#each inputIssues as issue (issue.message)}
      <li>{issue.message}</li>
    {/each}
  </ul>
{/if}

<style>
  input {
    margin-block-start: 0.25rem;
    border: 2px var(--c-black-8) solid;
    background-color: var(--c-white);
    padding: 0.5rem;
    color: var(--c-black);
    border-radius: var(--br-1);

    &[data-input-state="error"] {
      border-color: red;
    }
  }

  ul {
    margin-block-start: 0.25rem;
  }

  li {
    color: red;
    font-size: var(--fs--2);
  }
</style>
