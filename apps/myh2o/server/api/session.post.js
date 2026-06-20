import fs from 'fs-extra'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await fs.writeJson(
    path.resolve('data/session.json'),
    body,
    { spaces: 2 }
  )

  return {
    success: true
  }
})