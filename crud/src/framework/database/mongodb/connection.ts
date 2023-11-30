import mongoose from 'mongoose'
import config from '../../../config'

const mongoConnection = () => {
  mongoose
    .connect(config.database.mongo.url)
    .then(() => {
      console.log('DB connection Successfully!')
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error)
    })
}

export default mongoConnection
