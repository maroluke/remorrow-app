<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div v-if="loading" class="text-center">
      <p>Lade Dashboard...</p>
    </div>

    <div v-else-if="error" class="text-red-500">
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <div v-if="!profile" class="bg-yellow-50 p-4 rounded-md mb-6">
        <p class="text-yellow-800">
          Bitte vervollständigen Sie Ihr Profil, um alle Funktionen nutzen zu
          können.
        </p>
        <NuxtLink
          to="/profile/edit"
          class="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Profil vervollständigen
        </NuxtLink>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Anbieter Dashboard -->
          <div
            v-if="profile.role === 'provider'"
            class="bg-white p-6 rounded-lg shadow"
          >
            <h2 class="text-xl font-semibold mb-4">Anbieter Dashboard</h2>
            <div class="space-y-4">
              <NuxtLink
                to="/provider/services"
                class="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
              >
                Meine Dienste verwalten
              </NuxtLink>
              <NuxtLink
                to="/provider/requests"
                class="block bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-center"
              >
                Anfragen verwalten
              </NuxtLink>
            </div>
          </div>

          <!-- Kunden Dashboard -->
          <div
            v-if="profile.role === 'customer'"
            class="bg-white p-6 rounded-lg shadow"
          >
            <h2 class="text-xl font-semibold mb-4">Kunden Dashboard</h2>
            <div class="space-y-4">
              <NuxtLink
                to="/services"
                class="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
              >
                Dienste entdecken
              </NuxtLink>
              <NuxtLink
                to="/my-requests"
                class="block bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-center"
              >
                Meine Anfragen
              </NuxtLink>
            </div>
          </div>

          <!-- Gemeinsame Funktionen -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Mein Konto</h2>
            <div class="space-y-4">
              <NuxtLink
                to="/profile"
                class="block bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-center"
              >
                Profil bearbeiten
              </NuxtLink>
              <NuxtLink
                to="/settings"
                class="block bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-center"
              >
                Einstellungen
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

const client = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(true);
const error = ref<string | null>(null);
const profile = ref<any>(null);

// Lade das Profil
const loadProfile = async () => {
  try {
    if (!user.value) {
      error.value = "Nicht angemeldet";
      return;
    }

    const { data, error: profileError } = await client
      .from("profiles")
      .select("*")
      .eq("id", user.value.id)
      .single();

    if (profileError) {
      if (profileError.code === "PGRST116") {
        // Profil existiert noch nicht
        profile.value = null;
      } else {
        throw profileError;
      }
    } else {
      profile.value = data;
    }
  } catch (e) {
    console.error("Fehler beim Laden des Profils:", e);
    error.value = "Fehler beim Laden des Profils";
  } finally {
    loading.value = false;
  }
};

// Lade das Profil beim Mounten
onMounted(loadProfile);

// Beobachte Änderungen am Benutzer
watch(user, (newUser: User | null) => {
  if (newUser) {
    loadProfile();
  } else {
    profile.value = null;
    loading.value = false;
  }
});
</script>
