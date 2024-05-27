'use client'

import { useEffect, useState } from 'react'
import { productType } from '@/types/product'
import { api } from '@/services/api'
import style from './style.module.css'
import { GiIronCross } from 'react-icons/gi'
import { MdOutlineExpandLess, MdExpandMore } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { FaSortAmountUp } from 'react-icons/fa'
import { BiSolidPurchaseTag } from 'react-icons/bi'

interface ProductProps {
  product: productType
}

const Card = ({ product }: ProductProps) => {
  const [activity, setActivity] = useState<boolean>(true)
  const [buyQuantity, setBuyQuantity] = useState<number>(0)
  const [totalQuantity, setTotalQuantity] = useState<number>(product.amount)
  const [imageError, setImageError] = useState<boolean>(false)
  const [isPurchased, setIsPurchased] = useState<boolean>(false)

  useEffect(() => {
    setTotalQuantity(product.amount)
  }, [product])

  useEffect(() => {
    localStorage.setItem(
      `product-quantity-${product.id}`,
      totalQuantity.toString(),
    )
  }, [totalQuantity, product.id])

  const handleBuyClick = async () => {
    if (buyQuantity <= 0 || totalQuantity <= 0) return

    try {
      await api.post(`/decreaseAmount/${product.id}`, { quantity: buyQuantity })
      setTotalQuantity((prevTotal) => prevTotal - buyQuantity)
      setBuyQuantity(0)
      setActivity(false)
      setIsPurchased(true)
      setTimeout(() => {
        setActivity(true)
        setIsPurchased(false)
      }, 1500)
    } catch (e) {
      console.error('Failed to buy product:', e)
    }
  }

  const increaseBuyQuantity = () =>
    setBuyQuantity((prevQuantity) => prevQuantity + 1)
  const decreaseBuyQuantity = () =>
    buyQuantity > 0 && setBuyQuantity((prevQuantity) => prevQuantity - 1)

  const handleImageError = () => setImageError(true)

  return (
    <div className={style.card}>
      <div className={style.card_img_container}>
        <img
          src={
            imageError
              ? 'https://via.placeholder.com/640x480.png?text=Image+Not+Available'
              : product.image
          }
          alt={product.name}
          className={style.card_img}
          onError={handleImageError}
        />
      </div>
      <div className={style.card_content}>
        <div className={style.card_info}>
          <h1 className={style.card_name}>{product.name}</h1>
          <div className={style.category_container}>
            <TbCategory className={style.category_icon} />
            <p className={style.card_category}>
              Categoria: {product?.category?.name}
            </p>
          </div>
          <div className={style.quantity_container}>
            <FaSortAmountUp className={style.quantity_icon} />
            <p className={style.card_total_quantity}>
              Quantidade total: {totalQuantity}
            </p>
          </div>
        </div>
        <div className={style.card_actions}>
          <div className={style.card_p}>
            <h2 className={style.card_price}>
              {parseFloat(product.price).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </h2>
          </div>
          {totalQuantity > 0 ? (
            <div className={style.card_buttons}>
              <div className={style.card_buy_quantity_wrapper}>
                <button
                  className={style.quantity_btn}
                  onClick={increaseBuyQuantity}
                >
                  <MdOutlineExpandLess className={style.decrease_icon} />
                </button>
                <p className={style.card_buy_quantity}>{buyQuantity}</p>
                <button
                  className={style.quantity_btn}
                  onClick={decreaseBuyQuantity}
                >
                  <MdExpandMore className={style.increase_icon} />
                </button>
              </div>
              <button
                className={style.card_btn2}
                onClick={handleBuyClick}
                disabled={isPurchased}
              >
                <div className={style.buy_content}>
                  <div>
                    <span>{isPurchased ? 'Comprado' : 'Comprar'}</span>
                  </div>
                  <div>
                    <BiSolidPurchaseTag className={style.buy_icon} />
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className={`${style.card_btn2} ${style.out_of_stock}`}>
              <span className={style.buy_content}>Produto esgotado</span>
            </div>
          )}
        </div>
      </div>
      <div className={style.card_background_icon}>
        <GiIronCross />
      </div>
    </div>
  )
}

export default Card
