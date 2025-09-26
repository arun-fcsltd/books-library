import { ref } from 'vue'
import { useSupabaseClient, useSupabaseAuthClient } from '#imports'

export const useUserRoles = () => {
  const client = useSupabaseClient()
  const auth = useSupabaseAuthClient().auth
  const roles = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchRoles = async () => {
    loading.value = true
    error.value = null
    try {
      const user = await auth.getUser()
      if (!user.data.user) throw new Error('No user logged in')

      const { data, error: fetchError } = await client
        .from('user_role')
        .select(`
          role_id,
          role (name)
        `)
        .eq('user_id', user.data.user.id)

      if (fetchError) throw fetchError

      roles.value = data.map(item => item.role.name)  // e.g., ['user', 'admin']
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { roles, loading, error, fetchRoles }
}