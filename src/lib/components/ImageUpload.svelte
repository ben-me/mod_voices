<script lang="ts">
  import type { RemoteFormIssue } from "@sveltejs/kit";
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = {
    inputIssues?: RemoteFormIssue[];
  } & HTMLInputAttributes;

  let {
    files = $bindable(),
    inputIssues = $bindable(),
    ...rest
  }: Props = $props();
</script>

<label>
  <input type="file" bind:files {...rest} />
</label>

{#if inputIssues && inputIssues?.length > 0}
  <ul role="list">
    {#each inputIssues as issue (issue.message)}
      <li>{issue.message}</li>
    {/each}
  </ul>
{/if}

<style>
  label {
    margin-block-start: auto;
  }

  input {
    max-width: 100%;
  }

  ul {
    margin-block-start: 0.25rem;
  }

  li {
    color: red;
    font-size: var(--fs--2);
  }
</style>
