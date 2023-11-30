import dotenv from 'dotenv'
dotenv.config()

export default {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3000,
  host: process.env.HOST ?? '0.0.0.0',
  database: {
    mongo: {
      url: process.env.MONGODB_URL ?? 'mongodb://localhost:27017'
    }
  }
}
