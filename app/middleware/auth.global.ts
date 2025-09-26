export default defineNuxtRouteMiddleware((to, from) => {

  const user = useSupabaseUser();
 
  if (to.path.startsWith('/dashboard')) {
    if (!user.value) {
      //user isn't logged in and trying to access dashboard
      return navigateTo('/auth/login')
    }
  }

  if (to.path.startsWith('/auth')) {
    if (user.value) {
      //user is logged in and trying to access login page or register page
      return navigateTo('/dashboard')
    }
  }
  console.log('user is logged in', user?.value?.email)
})
