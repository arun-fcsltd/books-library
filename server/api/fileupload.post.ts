import formidable from 'formidable'
import fs from 'fs'
import { serverSupabaseClient } from '#supabase/server'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  // ✅ Make sure formidable saves file to temp dir
  const form = formidable({ multiples: true, keepExtensions: true })

  const { files }: any = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err: any, fields: any, files: any) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })

  const uploaded: string[] = []

  // ✅ PrimeVue FileUpload sends "file" key
  const fileArray = Array.isArray(files.file) ? files.file : [files.file]

  for (const file of fileArray) {
    if (!file) continue

    const buffer = fs.readFileSync(file.filepath)

    // ✅ Safe unique filename with extension
    const ext = file.originalFilename?.split('.').pop() || 'bin'
    const filename = `${randomUUID()}.${ext}`
    const filePath = `uploads/${filename}`

    // ✅ Upload to Supabase bucket
    const { error } = await supabase.storage
      .from('Arun') // your bucket name
      .upload(filePath, buffer, {
        contentType: file.mimetype || 'application/octet-stream',
        upsert: false, // avoid overwrite
      })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }

    // ✅ Get public URL
    const { data } = supabase.storage
      .from('Arun')
      .getPublicUrl(filePath)

    uploaded.push(data.publicUrl)
  }

  return { urls: uploaded }
})
