<script lang="ts">
  import { m } from "$lib/paraglide/messages";
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

{#if inputIssues && inputIssues?.length > 0}
  <ul role="list">
    {#each inputIssues as issue (issue.message)}
      <li>{issue.message}</li>
    {/each}
  </ul>
{/if}

<label>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5z"
    />
  </svg>
  {m.new_project_upload_image()}
  <input class="visually-hidden" type="file" bind:files {...rest} />
</label>

<style>
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    margin-block-start: auto;
    background-color: var(--c-dark-blue-7);
    padding-block: 0.15rem;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--c-dark-blue);
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
