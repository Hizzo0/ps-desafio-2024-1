import { categoryType } from './category'

export type productType = {
  id: string
  name: string
  amount: number
  price: string
  image: string
  status: boolean
  category_id: string
  category: categoryType
  created_at: Date
  updated_at: Date
}
