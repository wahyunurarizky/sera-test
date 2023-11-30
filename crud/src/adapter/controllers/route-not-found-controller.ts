import { Request, Response, NextFunction } from 'express'
import AppError from '../../framework/helpers/app-error'

const routeNotFoundController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  next(
    new AppError(`url "${fullUrl}" not found with method [${req.method}]`, 404)
  )
}

export default routeNotFoundController
