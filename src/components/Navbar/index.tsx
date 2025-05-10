import { useContext, useEffect } from "react"
import styles from "@/components/Navbar/Navbar.module.scss"
import { BridgeGuardContext } from "@/context/BridgeGuard"
import { Link } from 'react-router-dom'
import { Language } from "@/types"
import { useTranslation } from "react-i18next"
import flagPTBR from "@/assets/flag-pt-br.svg"
import flagENUS from "@/assets/flag-en-us.svg"

function Navbar() {

  const { t, i18n } = useTranslation()

  const {
    isToShow,
    handleLougout
  } = useContext(BridgeGuardContext)

  const handleLanguageChange = async (lang: Language) => {
    await i18n.changeLanguage(lang)
  }

  const WIDTH_IMG = 26

  const selectedURI = window.location.pathname

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng")
    if (lang) {
      i18n.changeLanguage(lang)
    }
  }, [])

  return (
    <div className={`${styles.navbar} mb-8`}>
      <h1 className={`${styles.navbarBrand}`}>
        <Link className="text-white no-underline hover:text-white" to="/web-agenda/">
          {t('navbar.title')}
        </Link>
      </h1>

      <nav>
        <ul>
          <li>
            <div className="flex">
              <button
                className="p-0 px-1"
                onClick={() => handleLanguageChange("en_US")}
              >
                <img width={WIDTH_IMG} src={flagENUS} alt="EN-US" />
              </button>
              /
              <button
                className="p-0 px-1"
                onClick={() => handleLanguageChange("pt_BR")}
              >
                <img width={WIDTH_IMG} src={flagPTBR} alt="PT-BR" />
              </button>
            </div>
          </li>

          {isToShow && (
            <>
              <li>
                <Link to="/web-agenda/" className={selectedURI === '/' ? 'text-black' : ''}>
                  {t('navbar.home')}
                </Link>
              </li>

              <li>
                <Link to={"/web-agenda/workType"} className={selectedURI === '/workType' ? 'text-black' : ''}>
                  {t('navbar.register-worktype')}
                </Link>
              </li>

              <li>
                <Link to="/web-agenda/admin" className={selectedURI === '/admin' ? 'text-black' : ''}>
                  {t('navbar.admin')}
                </Link>
              </li>

              <li><button className="p-0" onClick={handleLougout}>
                {t('navbar.logout')}
              </button>
              </li>
            </>
          )}

          {!isToShow && <li>
            <Link to="/web-agenda/login" className={selectedURI === '/login' ? 'text-black' : ''}>
              {t('navbar.login')}
            </Link>
          </li>}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar