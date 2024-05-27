'use client'

import { useState } from 'react'
import styles from './style.module.css'

/* Componente SearchBar */
const SearchBar = ({
  onFilter,
}: {
  onFilter: (searchTerm: string) => void
}) => {
  /* Estado local para armazenar o termo de pesquisa */
  const [searchTerm, setSearchTerm] = useState<string>('')

  /* Função para lidar com a alteração no campo de entrada */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchTerm(value)
    onFilter(value)
  }

  /* Renderização do componente */
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Pesquisar por nome..."
        value={searchTerm}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  )
}

/* Exportação do componente */
export default SearchBar
