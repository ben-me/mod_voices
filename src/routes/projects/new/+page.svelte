<script lang="ts">
  import ImageUpload from "$lib/components/ImageUpload.svelte";
  import Input from "$lib/components/Input.svelte";
  import { m } from "$lib/paraglide/messages";
  import { create_project } from "../project.remote";
  import { project_create_schema } from "$lib/utilities/validation-schemas";

  type VoiceDescription = {
    gender: string;
    pitch: string;
    description: string;
  };

  const { description, voiceDescriptions, title, image } =
    create_project.fields;

  const voices_needed = $state<VoiceDescription[]>([]);

  function add_new_voice_description() {
    voices_needed.push({
      gender: "",
      pitch: "",
      description: "",
    });
  }
</script>

<svelte:head>
  <title>{m.title_new_project()}</title>
</svelte:head>

<div class="wrapper">
  <h2>{m.new_project_heading()}</h2>
  <form
    {...create_project.preflight(project_create_schema)}
    enctype="multipart/form-data"
    oninput={() => create_project.validate()}
  >
    <div class="general-information">
      <h3>{m.new_project_general_info()}</h3>
      <label>
        {m.new_project_title()}:
        <Input {...title.as("text")} inputIssues={title.issues()} />
      </label>
      <label>
        {m.new_project_description()}:
        <textarea rows="10" {...description.as("text")}></textarea>
      </label>
    </div>
    <div class="project-image">
      <div class="project-image-header">
        <h3>{m.new_project_image_heading()}:</h3>
        {#if image.value() && !image.issues()}
          <button
            type="button"
            class="close-button"
            aria-label={m.new_project_remove_image_aria_label()}
            onclick={() => create_project.fields.image.set(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
              />
            </svg>
          </button>
        {/if}
      </div>
      <ImageUpload
        {...image.as("file")}
        accept="image/png, image/webp, image/jpeg"
        inputIssues={image.issues()}
        includeDropZone={true}
        dropZoneClasses="drop-zone"
      />
    </div>
    <div class="voice-information">
      <h3>
        {m.new_project_voices_heading()}: {voices_needed.length}
      </h3>
      <ul>
        {#each voices_needed as voice, index (index)}
          <li>
            <div class="new-voice-heading">
              <p>{m.new_project_voice_entry()} {index + 1}</p>
              <button
                type="button"
                class="close-button"
                onclick={() => voices_needed.splice(index, 1)}
                aria-label={m.new_project_remove_voice()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
                  />
                </svg>
              </button>
            </div>
            <div class="new-voice-inputs">
              <label>
                {m.new_project_voice_description()}:
                <Input
                  {...voiceDescriptions[index].gender.as("text")}
                  inputIssues={voiceDescriptions[index].gender.issues()}
                  bind:value={voice.gender}
                  placeholder={m.new_project_voice_description_placeholder()}
                />
              </label>
              <label>
                {m.new_project_voice_pitch()}:
                <Input
                  {...voiceDescriptions[index].pitch.as("text")}
                  inputIssues={voiceDescriptions[index].pitch.issues()}
                  bind:value={voice.pitch}
                  placeholder={m.new_project_voice_pitch_placeholder()}
                />
              </label>
              <label>
                {m.new_project_voice_extra_info()}:
                <Input
                  {...voiceDescriptions[index].description.as("text")}
                  inputIssues={voiceDescriptions[index].description.issues()}
                  bind:value={voice.description}
                />
              </label>
            </div>
          </li>
        {/each}
        <li class="ghost">
          <div class="new-voice-heading">
            <p>{m.new_project_voice_entry()}</p>
            <button
              type="button"
              class="close-button"
              aria-label={m.new_project_remove_voice()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
                />
              </svg>
            </button>
          </div>
          <div class="new-voice-inputs">
            <label>
              {m.new_project_voice_description()}:
              <Input type="text" disabled />
            </label>
            <label>
              {m.new_project_voice_pitch()}:
              <Input type="text" disabled />
            </label>
            <label>
              {m.new_project_voice_extra_info()}:
              <Input type="text" disabled />
            </label>
          </div>
          <button
            type="button"
            class="ghost-button"
            onclick={add_new_voice_description}
            aria-label={m.new_project_add_voice()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
    <button class="submit btn">{m.save()}</button>
  </form>
</div>

<style>
  h2 {
    margin-block-end: 1.5rem;
    color: var(--c-gold);
  }

  h3 {
    font-size: var(--fs-1);
  }

  .close-button {
    align-self: center;
    background: none;
    border: none;
    color: var(--c-red);
    cursor: pointer;

    svg {
      width: 1.5rem;
      height: auto;
      transition: color 0.2s ease;
    }

    &:hover,
    &:focus-visible {
      color: hsl(from var(--c-red) h s 55%);
    }
  }

  form {
    background-color: light-dark(var(--c-black-9), var(--c-black-2));
    display: grid;
    align-items: start;
    gap: 1.5rem;
    border: 1px solid var(--c-brown);
    padding: 1.5rem;

    @media (--above-sm) {
      grid-template-columns: 1fr 250px;
    }

    label {
      display: flex;
      flex-direction: column;
    }
  }

  .general-information {
    display: grid;
    gap: 0.5rem;
  }

  .voice-information {
    @media (--above-sm) {
      grid-column: span 2;
    }

    ul {
      margin-block-start: 0.5rem;
      display: grid;
      gap: 0.75rem;

      @media (--above-md) {
        grid-template-columns: repeat(3, 1fr);
      }

      li {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
        border: 1px solid var(--c-brown);
        background-color: light-dark(var(--c-black-9), var(--c-black-2));

        .new-voice-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--c-brown);
          font-weight: bold;
        }

        .new-voice-inputs {
          display: grid;
          gap: 1rem;
        }
      }

      .ghost {
        position: relative;

        .ghost-button {
          position: absolute;
          inset: 0;
          display: grid;
          place-content: center;
          background: none;
          border: none;
          cursor: pointer;

          svg {
            width: 2.5rem;
            height: auto;
            fill: var(--c-brown);
          }
        }

        @media (--above-md) {
          opacity: 0.6;
          transition: opacity 0.05s linear;

          &:hover {
            opacity: 1;
          }

          &:has(button:focus-visible) {
            opacity: 1;
          }
        }

        li,
        p,
        div {
          visibility: hidden;
        }
      }
    }
  }

  .project-image {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .project-image-header {
      display: flex;
      height: max-content;
      justify-content: space-between;
    }

    :global(.drop-zone) {
      display: grid;
      width: 250px;
      aspect-ratio: 1/1;
      z-index: 1;
      margin-inline: auto;
      margin-block-end: auto;

      :global(p) {
        display: grid;
        place-content: center;
        background-color: hsl(from var(--c-brown) h s l / 20%);
        text-align: center;
        gap: 0.75em;
        padding: 1em;
        border: 3px dashed hsl(from var(--c-brown) h s 55%);

        :global(p:hover) {
          background-color: hsl(from var(--c-brown) h s l / 50%);
        }

        :global(.file-instructions) {
          font-size: var(--fs--1);
          opacity: 0.5;
        }
      }

      :global(img) {
        height: 100%;
        object-fit: contain;
        border: 1px solid var(--c-brown);
        border-style: outset;
      }
    }
  }

  .submit {
    @media (--above-sm) {
      grid-column: 2/2;
    }
  }
</style>
