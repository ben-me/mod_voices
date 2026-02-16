<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import { m } from "$lib/paraglide/messages";
  import { create_project } from "../project.remote";

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

  function remove_new_voice_description(index: number) {
    voices_needed.splice(index, 1);
  }
</script>

<svelte:head>
  <title>{m.title_new_project()}</title>
</svelte:head>

<div class="wrapper">
  <h2>{m.new_project_heading()}</h2>
  <form {...create_project} enctype="multipart/form-data">
    <div>
      <h3>{m.new_project_general_info()}</h3>
      <label class="project-title">
        {m.new_project_title()}:
        <Input {...title.as("text")} inputIssues={title.issues()} />
      </label>
      <label>
        {m.new_project_description()}:
        <textarea rows="10" {...description.as("text")}></textarea>
      </label>
    </div>
    <div>
      <h3>Vorschaubild:</h3>
      <label>
        <Input {...image.as("file")} accept=".jpeg,.png" />
      </label>
    </div>
    <div>
      <h3 class="project-voices">
        {m.new_project_voices_heading()}: {voices_needed.length}
      </h3>
      <ul>
        {#each voices_needed as voice, index (index)}
          <li>
            <div class="new-voice-heading">
              <p>{m.new_project_voice_entry()} {index + 1}</p>
              <button
                type="button"
                onclick={() => remove_new_voice_description(index)}
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
                {m.new_project_voice_gender()}:
                <Input
                  {...voiceDescriptions[index].gender.as("text")}
                  inputIssues={voiceDescriptions[index].gender.issues()}
                  bind:value={voice.gender}
                />
              </label>
              <label>
                {m.new_project_voice_pitch()}:
                <Input
                  {...voiceDescriptions[index].pitch.as("text")}
                  inputIssues={voiceDescriptions[index].pitch.issues()}
                  bind:value={voice.pitch}
                />
              </label>
              <label>
                {m.new_project_voice_description()}:
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
          <p>{m.new_project_voice_entry()}</p>
          <div>
            <label>
              {m.new_project_voice_gender()}:
              <Input type="text" disabled />
            </label>
            <label>
              {m.new_project_voice_pitch()}:
              <Input type="text" disabled />
            </label>
            <label>
              {m.new_project_voice_description()}:
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
    margin-block: 1rem;
    font-size: var(--fs-2);
    color: var(--c-gold);
  }

  p {
    font-size: var(--fs-1);
  }

  form {
    background-color: light-dark(var(--c-black-9), var(--c-black-2));
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
    border: 1px solid var(--c-brown);
    padding: 1.5rem;

    div {
      &:first-child {
        display: grid;
        gap: 0.5rem;
      }

      &:last-of-type {
        grid-column: span 2;
      }
    }

    > div h3 {
      font-size: var(--fs-1);
    }

    label {
      font-weight: 600;
      display: flex;
      flex-direction: column;
    }

    p {
      font-weight: 600;
    }
  }

  .submit {
    grid-column: 2/2;
    place-self: end;
  }

  ul {
    margin-block-start: 0.5rem;
    display: grid;
    gap: 0.75rem;

    @media (--above-md) {
      grid-template-columns: repeat(3, 1fr);
    }

    li {
      display: grid;
      padding: 1rem;
      gap: 0.5rem;
      border: 1px solid var(--c-brown);
      background-color: light-dark(var(--c-black-9), var(--c-black-2));

      p {
        color: var(--c-brown);
      }

      label {
        font-weight: 400;
      }

      .ghost-button {
        height: 100%;
        width: 100%;
        display: grid;
        place-content: center;
        position: absolute;
        background: none;
        border: none;
        cursor: pointer;

        svg {
          width: 2.5rem;
          height: auto;
          fill: var(--c-brown);
        }
      }

      .new-voice-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
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
      }

      .new-voice-inputs {
        display: grid;
        gap: 1rem;
      }
    }

    .ghost {
      position: relative;

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
</style>
