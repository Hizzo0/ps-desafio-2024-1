'use client'

import { FaHome } from 'react-icons/fa'
import style from './style.module.css'

interface NavbarProps {
  logo: string
}

export default function Navbar({ logo }: NavbarProps) {
  return (
    <nav className={style.navbar}>
      <div className={style.navbar_nav}>
        <a href="http://localhost:3000/">
          <img src={logo} alt="Logo" className={style.logo} />
        </a>
        <ul className={style.nav_links}>
          <li className={style.nav_item}>
            <a href="http://localhost:3000/">
              <FaHome />
            </a>
          </li>
          <li className={style.nav_item}>
            <a href="#" className={style.icon_button}>
              Categorias
            </a>
          </li>
          <li className={style.nav_item}>
            <a href="#" className={style.icon_button}>
              Produtos
            </a>
          </li>
          <li className={style.nav_item}>
            <a href="#" className={style.icon_button}>
              Nossa história
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
