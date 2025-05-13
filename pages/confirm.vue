<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

const user = useSupabaseUser();

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName;
const redirectPathCookie = useCookie(`${cookieName}-redirect-path`, {
  default: () => null,
}) as { value: string | null };
const redirectPath = computed(() => redirectPathCookie.value);

watch(
  user,
  async (newUser: User | null) => {
    if (newUser) {
      // Clear cookie
      redirectPathCookie.value = null;
      // Redirect to path
      return navigateTo(redirectPath.value || "/auth/login");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
    ></div>
  </div>
</template>
