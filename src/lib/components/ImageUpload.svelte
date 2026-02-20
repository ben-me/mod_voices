<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import type { RemoteFormIssue } from "@sveltejs/kit";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { Attachment } from "svelte/attachments";

  type Props = {
    inputIssues?: RemoteFormIssue[];
    includeDropZone?: boolean;
    dropZoneClasses?: string;
  } & HTMLInputAttributes;

  let {
    files,
    inputIssues = $bindable(),
    includeDropZone = false,
    dropZoneClasses,
    ...rest
  }: Props = $props();

  let file_input: HTMLInputElement;

  const drop_zone: Attachment = (element) => {
    ["dragenter", "dragover"].forEach((event) => {
      element.addEventListener(event, (e) => prevent_default_behaviour(e));
    });

    element.addEventListener("drop", (e) => drop_listener(e));
    return () => {
      ["dragenter", "dragover"].forEach((event) =>
        element.removeEventListener(event, prevent_default_behaviour),
      );
      element.removeEventListener("drop", drop_listener);
    };
  };

  function drop_listener(e: Event) {
    const event = e as DragEvent;
    event.stopPropagation();
    event.preventDefault();

    const dt = event.dataTransfer;
    const uploaded_files = dt?.files;
    if (uploaded_files) {
      file_input.files = uploaded_files;
      file_input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }

  function show_preview_image(): Attachment | undefined {
    return (element) => {
      const img = element as HTMLImageElement;
      if (!files) {
        return;
      }
      const source = URL.createObjectURL(files?.[0]);
      img.src = source;
      return () => URL.revokeObjectURL(source);
    };
  }

  function prevent_default_behaviour(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }
</script>

{#if includeDropZone}
  <div class={dropZoneClasses} {@attach drop_zone}>
    {#if !inputIssues && files && files[0]}
      <img alt="" {@attach show_preview_image()} />
    {:else}
      <p>
        <span class="file-formats">
          Unterstützt folgenden Formate: <br />
          PNG, JPEG, WebP
          <br />
          (max. 1 MB)
        </span>
        <span class="file-instructions">
          {m.drag_and_drop_instruction()}
        </span>
      </p>
    {/if}
  </div>
{/if}

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
  <input class="visually-hidden" type="file" bind:this={file_input} {...rest} />
</label>

<style>
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    background-color: var(--c-dark-blue-7);
    padding-block: 0.15rem;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--c-dark-blue);
    }

    svg {
      width: 1.5rem;
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
