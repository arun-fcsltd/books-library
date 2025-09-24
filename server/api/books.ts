// server/api/books.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const method = event.method

  try {
    if (method === 'GET') {
      const query = getQuery(event)
      console.log(query);

      if (query.id) {
        // ✅ Fetch single book by ID
        const { data, error } = await client
          .from('books')
          .select('*')
          .eq('id', query.id as string)
          .single()

        if (error) throw error
        return data
      } else {
        // ✅ Fetch all books
        const { data, error } = await client
          .from('books')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        return data
      }
    }

    if (method === 'POST') {
      // Add new book
      const body = await readBody(event)

      const { data, error } = await client.from('books').insert(body as any).select()
      if (error) throw error
      return data[0]
    }

    if (method === 'PUT') {
      const body = await readBody(event)

      // Correct: pass a single object to update
      const { data, error } = await client.from('books')
        //@ts-ignore
        .update(body) // 👈 just an object, not array
        .eq('id', body.id)
        .select() // select returns the updated row(s)

      if (error) throw error
      return data?.[0] || null
    }


    if (method === 'DELETE') {
      // Delete book
      const query = getQuery(event)
      const { data, error } = await client.from('books')
        .delete()
        .eq('id', query.id as string)
      if (error) throw error
      return { success: true }
    }

    return { error: 'Method not allowed' }
  } catch (err: any) {
    return { error: err.message }
  }
})
