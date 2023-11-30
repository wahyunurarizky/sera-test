import { Express } from 'express'
import globalErrorController from '../../../adapter/controllers/global-error-controller'
import routeNotFoundController from '../../../adapter/controllers/route-not-found-controller'
import productRoutes from './product-routes'

const routes = (app: Express) => {
  app.use('/api/v1/products', productRoutes())

  app.all('*', routeNotFoundController)
  app.use(globalErrorController)
}

export default routes
