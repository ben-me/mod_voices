<script lang="ts">
  import "./style.css";
  import favicon from "$lib/assets/favicon.svg";
  import Header from "$lib/Header.svelte";

  const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="color-scheme" />
</svelte:head>

<Header />
<main id="main-content">
  {@render children?.()}
</main>
