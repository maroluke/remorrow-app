<script setup lang="ts">
const user = useSupabaseUser();
const route = useRoute();

// Nur weiterleiten, wenn wir nicht bereits auf der Login-Seite sind
onMounted(() => {
  if (!user.value && route.path !== "/auth/login") {
    navigateTo("/auth/login");
  } else if (user.value) {
    navigateTo("/dashboard");
  }
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <IconsLogo class="w-72" />
  </div>
</template>
