import express from 'express'
import productController from '../../../adapter/controllers/product-controller'

const productRoutes = () => {
  const router = express.Router()
  const controller = productController()

  router.get('/', controller.index)
  router.get('/:id', controller.show)
  router.post('/', controller.store)
  router.patch('/:id', controller.update)
  router.delete('/:id', controller.drop)

  return router
}

export default productRoutes
