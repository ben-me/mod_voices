<script lang="ts">
  import { resolve } from "$app/paths";
  import hero from "$lib/assets/hero.jpg";
</script>

<div class="relative">
  <img
    src={hero}
    alt="Bild aus Gothic 1 und 2 mit Sicht auf das alte Lacker und die Stadt Khorinis"
    class="relative opacity-55 max-h-dvh h-dvh object-cover 2xl:object-fill"
    width="3453"
    height="1440"
  />
  <div
    class="absolute inset-0 h-max m-auto grid gap-4 w-3/4 object-center place-items-center"
  >
    <h2
      class="text-5xl leading-22 font-meta text-shadow-lg text-shadow-black text-center my-[0_1rem]"
    >
      Erwecke Charaktere mit echten Stimmen zum Leben.
    </h2>
    <div class="flex gap-4">
      <a
        href={resolve("/projects")}
        class="px-4 py-2 bg-primary text-black font-semibold rounded border border-primary hover:bg-primary/80
          transition duration-200"
      >
        Projekt finden
      </a>
      <a
        href={resolve("/login")}
        class="px-4 py-2 text-primary font-semibold rounded border border-primary hover:bg-primary/10
          transition duration-200"
      >
        Stimme anbieten
      </a>
    </div>
  </div>
</div>
