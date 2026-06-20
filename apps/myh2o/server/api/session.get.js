import fs from 'fs-extra'
import path from 'path'

export default defineEventHandler(async () => {
  const file = path.resolve('data/session.json')

  const exists = await fs.pathExists(file)

  if (!exists) {
    return {
      loggedIn: false
    }
  }

  return await fs.readJson(file)
})