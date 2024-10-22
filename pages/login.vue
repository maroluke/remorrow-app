<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  const { data, error: loginError } = await auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (loginError) {
    error.value = loginError.message;
  }
};

watchEffect(() => {
  if (user.value) {
    navigateTo("/confirm");
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen gap-20">
    <div class="w-96">
      <IconsLogo class="w-44" />
      <p class="pt-10">Willkommen bei re:morrow.</p>
      <p class="pt-2">Bitte authentifizieren Sie sich, um fortzufahren.</p>
    </div>
    <Card class="w-sm w-96">
      <CardHeader>
        <CardTitle>Authentifizierung</CardTitle>
      </CardHeader>
      <form @submit.prevent="login">
        <CardContent>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="email">E-Mail</Label>
              <Input
                id="email"
                placeholder="Deine E-Mail"
                type="email"
                v-model="email"
                required
              />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Passwort</Label>
              <Input
                id="password"
                placeholder="Dein Passwort"
                type="password"
                v-model="password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button :type="'submit'">Login</Button>
          <div v-if="error">{{ error }}</div>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
