<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Neuen Dienst erstellen</h1>

    <form @submit.prevent="handleSubmit" class="max-w-lg">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium mb-1">Titel</label>
        <input
          id="title"
          v-model="service.title"
          type="text"
          required
          class="w-full px-3 py-2 border rounded-md"
          placeholder="Name des Dienstes"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium mb-1"
          >Beschreibung</label
        >
        <textarea
          id="description"
          v-model="service.description"
          required
          class="w-full px-3 py-2 border rounded-md"
          rows="4"
          placeholder="Beschreiben Sie Ihren Dienst"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="original_price" class="block text-sm font-medium mb-1"
          >Originalpreis (€)</label
        >
        <input
          id="original_price"
          v-model="service.original_price"
          type="number"
          required
          min="0"
          step="0.01"
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="price" class="block text-sm font-medium mb-1"
          >Angebotspreis (€)</label
        >
        <input
          id="price"
          v-model="service.price"
          type="number"
          required
          min="0"
          step="0.01"
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="category" class="block text-sm font-medium mb-1"
          >Kategorie</label
        >
        <select
          id="category"
          v-model="service.category"
          required
          class="w-full px-3 py-2 border rounded-md"
        >
          <option value="haushalt">Haushalt</option>
          <option value="garten">Garten</option>
          <option value="umzug">Umzug</option>
          <option value="reparatur">Reparatur</option>
          <option value="sonstiges">Sonstiges</option>
        </select>
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input v-model="service.is_available" type="checkbox" class="mr-2" />
          <span class="text-sm">Dienst ist verfügbar</span>
        </label>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isLoading ? "Speichern..." : "Dienst veröffentlichen" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "@/types/supabase";

type Service = Database["public"]["Tables"]["services"]["Insert"];

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const router = useRouter();

const isLoading = ref(false);
const service = ref<Service>({
  title: "",
  description: "",
  price: 0,
  original_price: 0,
  is_available: true,
  provider_id: user.value?.id,
  category: "haushalt",
});

async function handleSubmit() {
  if (!user.value) return;

  isLoading.value = true;
  try {
    const { error } = await supabase.from("services").insert(service.value);

    if (error) throw error;

    await router.push("/provider/dashboard");
  } catch (error) {
    console.error("Error:", error);
    alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
  } finally {
    isLoading.value = false;
  }
}
</script>
