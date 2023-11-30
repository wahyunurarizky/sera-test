import { IProduct } from '../../../../app/entitites/product'
import { IProductRepository } from '../../../../app/repositories/product-repository-interface'
import Product from '../models/product'
import AppError from '../../../helpers/app-error'

const itemRepository = (): IProductRepository => {
  const findAll = async () => {
    return (await Product.find()).map((d) => d.toObject()) as IProduct[]
  }

  const findById = async (id: string) => {
    const product = await Product.findById(id)
    if (product) {
      return product.toObject() as IProduct
    }
    throw new AppError('product not found with id: ' + id, 400)
  }

  const create = async (data: Omit<IProduct, '_id'>) => {
    const newProduct = await Product.create(data)
    return newProduct.toObject() as IProduct
  }

  const updateById = async (id: string, data: Partial<IProduct>) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, data)
    if (updatedProduct) {
      updatedProduct.toObject() as IProduct
    }
    throw new AppError('product not found with id: ' + id, 400)
  }

  const deleteById = async (id: string) => {
    const deletedProduct = await Product.findByIdAndDelete(id)
    console.log(deletedProduct)
  }

  return {
    findAll,
    create,
    findById,
    updateById,
    deleteById
  }
}

export default itemRepository
