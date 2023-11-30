import { NextFunction, Request, Response } from 'express'
import AppError from '../../framework/helpers/app-error'

export default (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    return res.status(err instanceof AppError ? err.statusCode : 500).json({
      message: err.message,
      stack: err.stack
    })
  } else if (process.env.NODE_ENV === 'production') {
    return res.status(err instanceof AppError ? err.statusCode : 500).json({
      message: err.message
    })
  }
}
