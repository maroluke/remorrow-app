<template>
  <div class="min-h-screen bg-gray-900">
    <header class="bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-white text-xl font-bold"
            >Remorrow</NuxtLink
          >

          <div class="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem href="/">
                  <NuxtLink to="/" class="text-white hover:text-gray-300"
                    >Home</NuxtLink
                  >
                </NavigationMenuItem>
                <NavigationMenuItem href="/services">
                  <NuxtLink
                    to="/services"
                    class="text-white hover:text-gray-300"
                    >Dienste</NuxtLink
                  >
                </NavigationMenuItem>
                <NavigationMenuItem href="/about">
                  <NuxtLink to="/about" class="text-white hover:text-gray-300"
                    >Über uns</NuxtLink
                  >
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Menubar>
              <template v-if="!client.auth.getUser()">
                <NuxtLink to="/auth/login">
                  <Button variant="ghost" class="text-white">Anmelden</Button>
                </NuxtLink>
                <NuxtLink to="/auth/register">
                  <Button class="bg-blue-600 text-white hover:bg-blue-700"
                    >Registrieren</Button
                  >
                </NuxtLink>
              </template>
              <template v-else>
                <NuxtLink to="/profile">
                  <Button variant="ghost" class="text-white">Profil</Button>
                </NuxtLink>
                <Button
                  variant="ghost"
                  class="text-white"
                  @click="client.auth.signOut()"
                  >Abmelden</Button
                >
              </template>
            </Menubar>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-gray-800 text-gray-300 py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p>&copy; 2024 Remorrow. Alle Rechte vorbehalten.</p>
          </div>
          <div class="flex space-x-4">
            <NuxtLink to="/privacy" class="text-gray-300 hover:text-white"
              >Datenschutz</NuxtLink
            >
            <NuxtLink to="/terms" class="text-gray-300 hover:text-white"
              >AGB</NuxtLink
            >
            <NuxtLink to="/contact" class="text-gray-300 hover:text-white"
              >Kontakt</NuxtLink
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const handleSignOut = async () => {
  try {
    await client.auth.signOut();
    router.push("/auth/login");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
</script>
