export default defineNuxtRouteMiddleware(() => {
  if (process.server)
    return

  const loggedIn =
    localStorage.getItem('loggedIn')

  if (!loggedIn) {
    return navigateTo('/welcome')
  }
})