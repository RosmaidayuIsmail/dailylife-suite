import fs from 'fs-extra'
import path from 'path'

export default defineEventHandler(async () => {
  await fs.writeJson(
    path.resolve('data/session.json'),
    {
      loggedIn: false
    },
    {
      spaces: 2
    }
  )

  return {
    success: true
  }
})