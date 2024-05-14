'use client'

import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import Card from '@/components/site/cards/card'
import style from '@/app/(site)/auth/sign-in/style.module.css'
// Não pode usar
import { toast } from '@/components/use-toast'

export default function Home() {
  const [products, setProducts] = useState<productType[] | null>(null)

  const requestData = async () => {
    try {
      const response: productType[] | null = await api.get('/products')
      setProducts(response)
    } catch (e) {
      // Não pode usar
      toast({
        title: `${e}`,
      })
    }
  }

  useEffect(() => {
    requestData()
  }, [])

  return (
    <div className={style.productspage}>
      <div className={style.wrapper}>
        {products?.map((product: productType, index: number) => (
          <Card product={product} />
        ))}
      </div>
    </div>
  )
}
