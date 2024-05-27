'use client'

import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { productType } from '@/types/product'
import Card from '@/components/site/cards/card'
import SearchBar from '@/components/site/searchbar/searchbar'
import style from '@/app/(site)/auth/sign-in/style.module.css'
import Navbar from '@/components/site/navbar/navbar'
import Footer from '@/components/site/footer/footer'

export default function Home() {
  const [products, setProducts] = useState<productType[] | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<
    productType[] | null
  >(null)

  // Função para requisitar os produtos da API
  const requestData = async () => {
    try {
      const response: productType[] | null = await api.get('/products')
      setProducts(response)
      setFilteredProducts(response)
    } catch (e) {
      console.error(e)
    }
  }

  // Função para filtrar os produtos com base no termo de busca
  const handleFilter = (searchTerm: string) => {
    if (products) {
      const filtered = products.filter((product) => {
        const matchesName = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
        return matchesName
      })
      setFilteredProducts(filtered)
    }
  }

  // useEffect para carregar os produtos ao montar o componente
  useEffect(() => {
    requestData()
  }, [])

  return (
    // Renderização da página inicial
    <div className={style.productspage}>
      <Navbar logo="/images/logo3.png" />
      {/* Barra de busca para filtrar os produtos */}
      <SearchBar onFilter={handleFilter} />
      <div className={style.wrapper}>
        {/* Renderiza os cards de produto filtrados */}
        {filteredProducts?.map((product: productType, index: number) => (
          <Card key={index} product={product} />
        ))}
      </div>
      {/* Rodapé */}
      <Footer />
    </div>
  )
}
