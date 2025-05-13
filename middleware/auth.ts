export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // Wenn der Benutzer nicht eingeloggt ist und versucht, eine geschützte Route zu besuchen
  if (!user.value && to.path !== '/auth/login' && to.path !== '/auth/register') {
    return navigateTo('/auth/login')
  }

  // Wenn der Benutzer eingeloggt ist und versucht, die Login- oder Registrierungsseite zu besuchen
  if (user.value && (to.path === '/auth/login' || to.path === '/auth/register')) {
    return navigateTo('/dashboard')
  }
}) 