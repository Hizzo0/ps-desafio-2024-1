import style from './style.module.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    // Componente de rodapé
    <footer className={style.footer}>
      <div className={style.footer_content}>
        {/* Seção "Sobre nós" */}
        <div className={style.footer_section}>
          <h3>Sobre nós</h3>
          <div className="p">
            <p>
              Bem-vindo à VascOnline! A VascOnline é a loja online definitiva
              para todos os torcedores apaixonados pelo Club de Regatas Vasco da
              Gama. Nossa missão é proporcionar aos vascaínos a melhor
              experiência de compra, oferecendo uma ampla gama de produtos
              oficiais e exclusivos, que celebram a rica história e tradição do
              nosso amado clube.
            </p>
          </div>
        </div>
        {/* Seção "Siga-nos nas Redes Sociais" */}
        <div className={style.footer_section}>
          <h3>Siga-nos nas Redes Sociais</h3>
          <div className={style.social_icons}>
            <a href="https://facebook.com" target="_blank">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank">
              <FaTwitter />
            </a>
          </div>
        </div>
        {/* Seção "Contato" */}
        <div className={style.footer_section}>
          <h3>Contato</h3>
          <div className="p">
            <p>Email: contato@vasconline.com</p>
            <p>Telefone: (21) 9999-9999</p>
            <p>
              Endereço: Rua São Januário - 123 - Rio de Janeiro - RJ - Brasil
            </p>
          </div>
        </div>
      </div>
      {/* Rodapé inferior */}
      <div className={style.footer_bottom}>
        <p>&copy; 2024 VascOnline. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
