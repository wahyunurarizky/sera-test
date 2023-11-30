import cors from 'cors'
import express, { Express } from 'express'

const expressConfig = (app: Express) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
}

export default expressConfig
