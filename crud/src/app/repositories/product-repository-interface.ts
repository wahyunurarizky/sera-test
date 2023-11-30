import { IProduct } from '../entitites/product'

export interface IProductRepository {
  findAll: () => Promise<IProduct[]>
  findById: (id: string) => Promise<IProduct>
  create: (data: Omit<IProduct, '_id'>) => Promise<IProduct>
  updateById: (
    id: string,
    data: Partial<Omit<IProduct, '_id'>>
  ) => Promise<IProduct>
  deleteById: (id: string) => Promise<void>
}
