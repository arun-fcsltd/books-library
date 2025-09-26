// composables/useAuth.js
import { useSupabaseClient, useSupabaseSession } from '#imports'
import { navigateTo } from '#app'

export default function useAuth() {
  const client = useSupabaseClient()
  const session = useSupabaseSession()

  // user_metadata as `user`
  const user = session.value?.user?.user_metadata || {}
  if (Object.keys(user).length > 0) {
    user.role = user.role || 'user'
  }

  // logout function
  const logout = async () => {
    try {
      await client.auth.signOut()
      // redirect to login page
      
      window.location.href = '/auth/login'
    } catch (err) {
      console.error('Logout failed:', err.message)
    }
  }

  return { user, logout }
}
