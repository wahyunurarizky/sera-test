import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
})

productSchema.index({
  name: 1
})

const Product = model('Product', productSchema)
export default Product
