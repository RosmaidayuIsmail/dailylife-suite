import fs from 'fs-extra'
import path from 'path'

export default defineEventHandler(async () => {
  return await fs.readJson(
    path.resolve('data/account.json')
  )
})