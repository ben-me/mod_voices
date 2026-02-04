<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import { m } from "$lib/paraglide/messages";

  type VoiceDescription = {
    id: string;
    gender: string;
    pitch: string;
    description: string;
    filled: boolean;
  };

  const voices_needed = $state<VoiceDescription[]>([]);

  function add_new_voice_description() {
    voices_needed.push({
      id: crypto.randomUUID(),
      gender: "",
      pitch: "",
      description: "",
      filled: false,
    });
  }
</script>

<svelte:head>
  <title>{m.title_new_project()}</title>
</svelte:head>

<div class="wrapper">
  <h2>Neues Projekt anlegen</h2>
  <form>
    <div>
      <h3>Allgemeine Informationen</h3>
      <label class="project-title">
        Titel:
        <Input type="text" />
      </label>
      <label>
        Beschreibung deiner Mod:
        <textarea rows="10"></textarea>
      </label>
      <label>
        Projektstatus:
        <select disabled>
          <option selected value="open">Offen</option>
          <option value="closed">Geschlossen</option>
        </select>
      </label>
    </div>
    <div>
      <h3 class="project-voices">Benötigte Stimmen: {voices_needed.length}</h3>
      <ul>
        {#each voices_needed as voice, index (index)}
          <li>
            <p>Stimme Nr. {index + 1}</p>
            <div>
              <label>
                Geschlecht des Characters:
                <Input type="text" bind:value={voice.gender} />
              </label>
              <label>
                Klang der Stimme:
                <Input type="text" bind:value={voice.pitch} />
              </label>
              <label>
                Zusätzliche Informationen:
                <Input type="text" bind:value={voice.description} />
              </label>
            </div>
          </li>
        {/each}
        <li class="ghost">
          <p>Stimme X</p>
          <div>
            <label>
              Geschlecht des Characters:
              <Input type="text" disabled />
            </label>
            <label>
              Klang der Stimme:
              <Input type="text" disabled />
            </label>
            <label>
              Zusätzliche Informationen:
              <Input type="text" disabled />
            </label>
          </div>
          <button
            type="button"
            onclick={add_new_voice_description}
            aria-label={m.project_new_add_voice()}
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
  </form>
</div>

<style>
  .wrapper {
    display: grid;
    padding-block: 2rem;
    max-width: min(80rem, 100%);
    margin-inline: auto;
  }

  h2 {
    margin-block-end: 1rem;
    font-size: var(--fs-2);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    > div:first-child {
      display: grid;
      gap: 0.5rem;
      border: 1px solid var(--c-brown);
      padding: 0.75rem;
    }

    h3 {
      font-size: var(--fs-1);
    }

    label {
      color: light-dark(var(--c-fg), var(--c-white));
      font-weight: 600;
      display: flex;
      flex-direction: column;
    }

    p {
      font-weight: 600;
    }
  }

  ul {
    margin-block-start: 0.5rem;
    display: grid;
    gap: 0.75rem;

    @media (--above-lg) {
      grid-template-columns: repeat(3, 1fr);
    }

    li {
      display: grid;
      padding: 0.75rem;
      border: 1px solid var(--c-fg);
    }

    p {
      color: var(--c-white);
      font-size: var(--fs-1);
    }

    .ghost {
      position: relative;

      li,
      p,
      div {
        visibility: hidden;
      }
    }
  }

  button {
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
      fill: var(--c-fg);
    }
  }
</style>
