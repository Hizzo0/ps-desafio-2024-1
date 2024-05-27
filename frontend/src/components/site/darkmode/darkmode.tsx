import { useState } from 'react'
import './style.module.css'

function DarkMode() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`DarkMode ${theme}`}>
      <header>
        <h1>Minha Aplicação</h1>
        <button onClick={toggleTheme}>Alternar Tema</button>
      </header>
      <main>{/* Conteúdo da aplicação */}</main>
    </div>
  )
}

export default DarkMode
