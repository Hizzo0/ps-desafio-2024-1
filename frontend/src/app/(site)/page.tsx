'use client'

import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import Card from '@/components/site/cards/card'
import style from '@/app/(site)/auth/sign-in/style.module.css'
import Navbar from '@/components/site/navbar/navbar'
import Footer from '@/components/site/footer/footer'
import DarkMode from '@/components/site/darkmode/darkmode'

export default function Home() {
  const [products, setProducts] = useState<productType[] | null>(null)

  const requestData = async () => {
    try {
      const response: productType[] | null = await api.get('/products')
      setProducts(response)
    } catch (e) {}
  }

  useEffect(() => {
    requestData()
  }, [])

  return (
    <div className={style.productspage}>
      <Navbar logo="/images/logo3.png" />
      <div className={style.wrapper}>
        {products?.map((product: productType, index: number) => (
          <Card key={index} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  )
}
