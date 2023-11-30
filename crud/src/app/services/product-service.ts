import { IProduct } from '../entitites/product'
import { IProductRepository } from '../repositories/product-repository-interface'

export const findAllProduct = async (repository: IProductRepository) => {
  return await repository.findAll()
}

export const createProduct = async (
  repository: IProductRepository,
  data: Omit<IProduct, '_id'>
) => {
  return await repository.create(data)
}

export const findProductById = async (
  repository: IProductRepository,
  id: string
) => {
  return await repository.findById(id)
}

export const updateProductById = async (
  repository: IProductRepository,
  id: string,
  data: Partial<Omit<IProduct, '_id'>>
) => {
  return await repository.updateById(id, data)
}

export const deleteProductById = async (
  repository: IProductRepository,
  id: string
) => {
  return await repository.deleteById(id)
}
