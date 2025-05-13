<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Anmelden bei Remorrow
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">E-Mail-Adresse</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="E-Mail-Adresse"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Passwort</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Passwort"
            />
          </div>
        </div>

        <!-- <div class="flex items-center justify-between">
          <div class="text-sm">
            <NuxtLink
              to="/auth/forgot-password"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Passwort vergessen?
            </NuxtLink>
          </div>
        </div> -->

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            Anmelden
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Noch kein Konto?
            <NuxtLink
              to="/auth/register"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Registrieren
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const loading = ref(false);
const client = useSupabaseClient();
const user = useSupabaseUser();

// Wenn der Benutzer bereits eingeloggt ist, leite ihn zum Dashboard weiter
onMounted(() => {
  if (user.value) {
    navigateTo("/dashboard");
  }
});

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    navigateTo("/dashboard");
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
</script>
