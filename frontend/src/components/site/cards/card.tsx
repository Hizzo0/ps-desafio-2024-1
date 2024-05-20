'use client'

import { productType } from '@/types/product'
import style from './style.module.css'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'

interface ProductProps {
  product: productType
}

export default function Card({ product }: ProductProps) {
  const [activity, setActivity] = useState<boolean>(true)
  const [quantity, setQuantity] = useState<number>(() => {
    const savedQuantity = localStorage.getItem(`product-quantity-${product.id}`)
    return savedQuantity ? parseInt(savedQuantity, 10) : product.amount
  })

  useEffect(() => {
    localStorage.setItem(`product-quantity-${product.id}`, quantity.toString())
  }, [quantity, product.id])

  const desactivateProduct = async () => {
    if (quantity <= 0) {
      return // Do nothing if quantity is 0 or less
    }
    try {
      await api.post(`/inactiveProduct/${product.id}`)
      setActivity(false)
      setQuantity((prevQuantity) => prevQuantity - 1)

      setTimeout(() => {
        setActivity(true)
      }, 1500)
    } catch (e) {
      console.error('Failed to deactivate product:', e)
    }
  }

  return (
    <div className={style.card}>
      <div className={style.card_img_container}>
        <img src={product.image} alt="" className={style.card_img} />
      </div>
      <div className={style.card_body}>
        <div>
          <h2 className={style.card_name}>{product.name}</h2>
          <p className={style.card_category}>
            Categoria: {product?.category?.name}
          </p>
          <p className={style.card_amount}>Quantidade: {quantity}</p>
          <p className={style.card_price}>Preço: {product.price}</p>
          <p className={style.card_status}>
            Status: {activity ? 'Comprar' : 'Comprado'}
          </p>
        </div>
        <div className={style.card_btn}>
          {quantity > 0 ? (
            activity ? (
              <button className={style.card_btn2} onClick={desactivateProduct}>
                Comprar
              </button>
            ) : (
              <p className={style.card_paragraph}>Comprado</p>
            )
          ) : (
            <button className={style.card_btn2_disabled} disabled>
              Produto esgotado
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
