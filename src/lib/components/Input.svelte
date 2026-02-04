<script lang="ts">
  import type { RemoteFormIssue } from "@sveltejs/kit";
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = {
    inputIssues?: RemoteFormIssue[];
  } & HTMLInputAttributes;

  let { inputIssues, value = $bindable(), ...rest }: Props = $props();
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
  ul {
    margin-block-start: 0.25rem;
  }

  li {
    color: red;
    font-size: var(--fs--2);
  }
</style>
