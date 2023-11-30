import { NextFunction, Request, Response } from 'express'
import itemRepository from '../../framework/database/mongodb/repositories/product-repository'
import {
  createProduct,
  deleteProductById,
  findAllProduct,
  findProductById,
  updateProductById
} from '../../app/services/product-service'
import catchAsync from '../../framework/helpers/catch-async'

export default () => {
  const repository = itemRepository()

  const index = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const products = await findAllProduct(repository)
      res.json({ message: 'success', data: products })
    }
  )

  const show = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params
      const product = await findProductById(repository, id)
      res.json({ message: 'success', data: product })
    }
  )

  const store = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newProduct = await createProduct(repository, req.body)
      res.json({ message: 'success', data: newProduct })
    }
  )

  const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params

      const updatedProduct = await updateProductById(repository, id, req.body)
      res.json({ message: 'success', data: updatedProduct })
    }
  )

  const drop = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params

      await deleteProductById(repository, id)
      res.json({ message: 'success', data: null })
    }
  )

  return {
    index,
    store,
    show,
    update,
    drop
  }
}
