<script lang="ts" generics="T">
  import { useDebounce } from "runed";
  import type { HTMLInputAttributes } from "svelte/elements";
  import * as v from "valibot";

  type Props = {
    validateOn: v.GenericSchema<T>;
  } & HTMLInputAttributes;

  const { validateOn, ...rest }: Props = $props();
  let value = $state("");
  let issues: null | v.BaseIssue<unknown>[] = $state(null);

  const validate_input = useDebounce(() => {
    if (value === "") {
      return;
    }
    try {
      v.parse(validateOn, value);
      issues = null;
    } catch (error) {
      const validation_error = error as v.ValiError<typeof validateOn>;
      issues = validation_error.issues;
    }
  }, 250);
</script>

<input {...rest} oninput={validate_input} bind:value />
{#if issues}
  <ul role="list">
    {#each issues as issue (issue.message)}
      <li>{issue.message}</li>
    {/each}
  </ul>
{/if}

<style>
  input {
    display: block;
    width: 100%;
    margin-block-start: 0.25rem;
    background-color: var(--c-white);
    padding: 0.25rem;
    color: var(--c-black);
    border-radius: var(--br-1);
  }

  li {
    color: red;
    font-size: var(--fs--2);
  }
</style>
