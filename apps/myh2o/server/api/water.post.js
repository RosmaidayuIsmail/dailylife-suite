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

  user.water.currentIntake += Number(body.amount)

  user.water.waterLog.unshift({
    amount: Number(body.amount),
    time: new Date().toISOString()
  })

  await fs.writeJson(
    userFile,
    user,
    {
      spaces: 2
    }
  )

  return user.water
})