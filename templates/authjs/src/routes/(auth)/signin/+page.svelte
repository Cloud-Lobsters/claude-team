<script lang="ts">
  import type { PageData } from "./$types";
  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Avatar, AvatarFallback } from "@/components/ui/avatar";
  import ThemeToggle from "$lib/components/theme-toggle.svelte";
  import MailIcon from "@lucide/svelte/icons/mail";
  import LockIcon from "@lucide/svelte/icons/lock";
  import LogInIcon from "@lucide/svelte/icons/log-in";
  import { fly } from "svelte/transition";
  import { toast } from "svelte-sonner";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();
  let { error } = data;

  let username = $state("");
  let password = $state("");

  function selectUser(userEmail: string) {
    username = userEmail;
    password = "password123";
  }

  // Handle authentication errors
  onMount(() => {
    console.log("onMount - error:", error);
    if (error) {
      console.log("Showing toast for error:", error);

      // Show error toast with delay
      setTimeout(() => {
        toast.error(error, {
          duration: 4000,
          position: "top-center",
        });
      }, 100);

      // Clear form fields
      username = "";
      password = "";
    }
  });
</script>

<div
  class="min-h-screen flex items-center justify-center bg-background relative"
>
  <div class="absolute top-4 right-4 z-10">
    <ThemeToggle />
  </div>

  <div
    class="w-full max-w-sm space-y-6 p-4"
    in:fly={{ y: 20, duration: 400, delay: 100 }}
  >
    <div class="flex flex-col space-y-2 text-center">
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
      >
        <LogInIcon class="h-6 w-6 text-primary" />
      </div>
      <h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p class="text-sm text-muted-foreground">
        Enter your email and password to sign in
      </p>
    </div>

    <Card>
      <CardContent class="pt-6">
        <form
          method="POST"
          action="/auth/callback/credentials"
          class="space-y-4"
        >
          <div class="space-y-2">
            <Label for="username">Email</Label>
            <div class="relative">
              <MailIcon
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="username"
                name="username"
                type="email"
                placeholder="name@example.com"
                bind:value={username}
                class="pl-10"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <div class="relative">
              <LockIcon
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                bind:value={password}
                class="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" class="w-full">Sign in</Button>
        </form>
      </CardContent>
    </Card>

    <div class="text-center text-sm text-muted-foreground">
      Need help? Contact your administrator
    </div>
  </div>
</div>
