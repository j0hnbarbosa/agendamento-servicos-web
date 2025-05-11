import { useContext } from 'react'
import { BridgeGuardContext } from '../../context/BridgeGuard'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Main from '@/components/Main'

const Login = () => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    error,
    isDisabled,
    isLoadingLogin
  } = useContext(BridgeGuardContext)

  return (
    <Main>
      <div>
        <div className="mx-auto p-10 bg-white rounded-md shadow-md max-w-md">
          <h2>{t('login.title')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email">{t('login.email')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoadingLogin}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                {t('login.password')}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoadingLogin}
              />
            </div>
            {
              error && <div className="text-red-700 py-3 font-bold text-sm">{error}</div>
            }

            <button disabled={isDisabled || isLoadingLogin} type="submit">
              {t('login.login-btn')}
            </button>
            {isLoadingLogin && t('common.loading')}
          </form>

          <div className='mt-2'>
            <Link to="/web-agenda/signup">
              {t('login.no-account')}
            </Link>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Login