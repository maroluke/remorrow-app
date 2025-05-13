<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

// Initialisiere die Session
onMounted(async () => {
  const {
    data: { session },
  } = await client.auth.getSession();
  if (session) {
    user.value = session.user;
  }
});
</script>
