import fs from 'fs-extra'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const session = await fs.readJson(
    path.resolve('data/session.json')
  )

  const userFile = path.resolve(
    'data/users',
    `${session.username.toLowerCase()}.json`
  )

  const user = await fs.readJson(userFile)

  user.reminders = {
    morning: body.morning,
    afternoon: body.afternoon
  }

  await fs.writeJson(
    userFile,
    user,
    {
      spaces: 2
    }
  )

  return {
    success: true
  }
})