<script lang="ts">
  import { page } from "$app/stores";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import DashboardHeader from "$lib/components/dashboard-header.svelte";
  import { sidebarCollapsed, setLastVisitedUrl } from "$lib/services-fe/preference.service.svelte";
  import { onMount, untrack } from "svelte";

  let { children } = $props();

  // Local state to prevent reactive loop
  let sidebarOpen = $state(!sidebarCollapsed.value);

  // Sync local state with preference on mount
  $effect(() => {
    sidebarOpen = !sidebarCollapsed.value;
  });

  // Handle sidebar toggle
  function handleSidebarChange(open: boolean) {
    sidebarOpen = open;
    untrack(() => {
      sidebarCollapsed.value = !open;
    });
  }

  // Track last visited board URL for redirect on next visit
  $effect(() => {
    const pathname = $page.url.pathname;

    // Only save board-level URLs (e.g., /dashboard/projects/{p_id}/{b_id})
    // Don't save generic pages like /dashboard or /dashboard/projects
    if (pathname.startsWith("/dashboard/projects/") && pathname.split("/").length >= 5) {
      untrack(() => {
        setLastVisitedUrl(pathname);
      });
    }
  });

  onMount(() => {
    // Create custom scroll indicator
    const scrollIndicator = document.createElement("div");
    scrollIndicator.className = "scroll-indicator";

    const scrollThumb = document.createElement("div");
    scrollThumb.className = "scroll-thumb";
    scrollIndicator.appendChild(scrollThumb);

    document.body.appendChild(scrollIndicator);

    let scrollTimeout: ReturnType<typeof setTimeout>;

    function updateScrollIndicator() {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const thumbHeight = Math.max(20, (window.innerHeight / document.documentElement.scrollHeight) * 100);
      const thumbPosition = scrollPercentage * (100 - thumbHeight);

      scrollThumb.style.height = `${thumbHeight}%`;
      scrollThumb.style.top = `${thumbPosition}%`;
    }

    function handleScroll() {
      scrollIndicator.classList.add("visible");
      updateScrollIndicator();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollIndicator.classList.remove("visible");
      }, 1000); // Hide after 1 second of no scrolling
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollIndicator, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollIndicator);
      clearTimeout(scrollTimeout);
      scrollIndicator.remove();
    };
  });
</script>

<svelte:head>
  <title>CL Project Management</title>
</svelte:head>

<Sidebar.Provider
  style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
  open={sidebarOpen}
  onOpenChange={handleSidebarChange}
>
  <AppSidebar user={$page.data.user} />
  <Sidebar.Inset>
    <DashboardHeader user={$page.data.user} title={$page.data.title || "Dashboard"} breadcrumbs={$page.data.breadcrumbs || []} />
    <div class="flex flex-1 flex-col p-6">
      {@render children?.()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>

<style>
  /* Prevent layout shift from scrollbar disappearing */
  :global(html) {
    scrollbar-gutter: stable;
  }

  /* Completely hide scrollbars */
  :global(*) {
    scrollbar-width: none !important; /* Firefox */
    -ms-overflow-style: none !important; /* IE/Edge */
  }

  :global(*::-webkit-scrollbar) {
    display: none !important; /* Chrome, Safari, Edge */
    width: 0 !important;
    height: 0 !important;
  }

  /* Custom overlay scrollbar that appears only when scrolling */
  :global(.scroll-indicator) {
    position: fixed;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 80vh;
    background: hsl(var(--border) / 0.3);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 9998;
  }

  :global(.scroll-indicator.visible) {
    opacity: 1;
  }

  :global(.scroll-thumb) {
    position: absolute;
    width: 100%;
    background: hsl(var(--border));
    border-radius: 2px;
    transition: all 0.1s ease;
  }

  /* Toast animations - allow natural sonner animations */
  :global([data-sonner-toast]) {
    animation: sonner-slide-in 0.3s ease-out;
  }

  @keyframes sonner-slide-in {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global([data-sonner-toast][data-type="error"]) {
    border-left: 4px solid hsl(var(--destructive));
    background: hsl(var(--destructive) / 0.1);
  }
</style>
