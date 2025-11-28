<script lang="ts">
  import "../app.css";

  import Toaster from "$lib/components/ui/sonner/sonner.svelte";
  import { ModeWatcher } from "mode-watcher";
  import { page } from "$app/stores";

  let { children } = $props();
</script>

<Toaster
  position="top-center"
  duration={3000}
  style="z-index: 9999;"
  offset={20}
  closeButton={true}
  richColors={true}
  expand={true}
  visibleToasts={3}
  gap={12}
  loadingIcon={undefined}
/>

<svelte:head>
  <title>{$page.data.branding?.title || "CL Project Management"}</title>
  <link rel="icon" href={$page.data.branding?.favicon || "/favicon.png"} />
</svelte:head>
{@render children?.()}
<ModeWatcher />
