'use client'

import { productType } from '@/types/product'
import style from './style.module.css'

interface ProductProps {
  product: productType
}

export default function Card({ product }: ProductProps) {
  return (
    <div className={style.card}>
      <img src={product.image} alt="" className={style.card_img} />
      <div className={style.card_body}>
        <div>
          <h2 className={style.card_name}>{product.name}</h2>
          <p className={style.card_category}>
            Categoria: {product?.category?.name}
          </p>
          <p className={style.card_amount}>Quantidade: {product.amount}</p>
          <p className={style.card_category}>Preço: {product.price}</p>
        </div>
      </div>
    </div>
  )
}
