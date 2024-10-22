<script setup lang="ts">
import { LogOut } from "lucide-vue-next";

const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const signOut = async () => {
  await auth.signOut();
  navigateTo("/login");
};
</script>

<template>
  <div v-if="user" class="flex justify-end p-4 absolute top-0 right-0">
    <Button @click="signOut"><LogOut class="w-4 h-4 mr-2" /> Ausloggen</Button>
  </div>
</template>
