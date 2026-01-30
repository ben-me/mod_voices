<script lang="ts">
  import type { RemoteFormIssue } from "@sveltejs/kit";
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = {
    inputIssues?: RemoteFormIssue[];
  } & HTMLInputAttributes;

  let { inputIssues, ...rest }: Props = $props();
  let value = $state("");
</script>

<input {...rest} bind:value data-input-state={inputIssues ? "error" : null} />

{#if inputIssues && inputIssues?.length > 0}
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
