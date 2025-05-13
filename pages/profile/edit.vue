<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Profil vervollständigen</h1>

    <form @submit.prevent="handleSubmit" class="max-w-md">
      <div class="mb-4">
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
          Ich bin ein*
        </label>
        <select
          id="role"
          v-model="form.role"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Bitte wählen</option>
          <option value="provider">Anbieter</option>
          <option value="customer">Interessent</option>
        </select>
      </div>

      <div class="mb-4">
        <label
          for="full_name"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          id="full_name"
          v-model="form.full_name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
          Telefon
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div class="mb-4">
        <label
          for="address"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Adresse
        </label>
        <textarea
          id="address"
          v-model="form.address"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="3"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        :disabled="loading"
      >
        {{ loading ? "Speichern..." : "Profil speichern" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Insert"];

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const loading = ref(false);
const form = ref<Omit<Profile, "id" | "created_at" | "updated_at">>({
  role: "" as "provider" | "customer",
  full_name: "",
  phone: "",
  address: "",
});

const handleSubmit = async () => {
  if (!user.value) return;

  loading.value = true;
  try {
    const profile: Profile = {
      id: user.value.id,
      ...form.value,
      email: user.value.email || "",
      updated_at: new Date().toISOString(),
    };

    const { error } = await client.from("profiles").upsert(profile);

    if (error) throw error;

    await navigateTo("/dashboard");
  } catch (error) {
    console.error("Fehler beim Speichern des Profils:", error);
  } finally {
    loading.value = false;
  }
};
</script>
