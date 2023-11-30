import { Express } from 'express'
import config from '../../config'

const server = (app: Express) => {
  const { port, host } = config

  app.listen(Number(port), host, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`)
  })
}

export default server
