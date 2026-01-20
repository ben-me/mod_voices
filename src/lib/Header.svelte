<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<header
  class="absolute w-full z-1 flex font-semibold items-center justify-between p-2 md:px-8"
>
  <h1 class="text-2xl font-bold">
    <a href={resolve("/")}><span class="text-primary">Mod</span>Voices</a>
  </h1>
  <nav>
    <ul class="flex items-center gap-4">
      <li>
        <a href={resolve("/projects")} class="inline-block p-2">Mod-Projekte</a>
      </li>
      <li>
        <a href={resolve("/voices")} class="inline-block p-2"
          >Synchronsprecher</a
        >
      </li>
      <li>
        <a
          href={resolve("/signup")}
          class="inline-block rounded-xs text-primary border-2 border-primary px-4 py-0.5"
        >
          Registrieren
        </a>
      </li>
      <li>
        <a
          href={resolve("/login")}
          class="inline-block rounded-xs border-3 border-primary bg-primary text-black px-4 py-0.5 font-semibold"
        >
          Login
        </a>
      </li>
    </ul>
  </nav>
</header>
