import fs from 'fs-extra'
import path from 'path'

export default defineEventHandler(async () => {
  const session = await fs.readJson(
    path.resolve('data/session.json')
  )

  if (!session.loggedIn) {
    return {
      morning: true,
      afternoon: false
    }
  }

  const userFile = path.resolve(
    'data/users',
    `${session.username.toLowerCase()}.json`
  )

  const user = await fs.readJson(userFile)

  return user.reminders
})