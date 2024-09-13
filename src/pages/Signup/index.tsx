import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import FormRegisterUser from '@/components/FormRegisterUser'
import Main from '@/components/Main'

const Signup = () => {
  const { t } = useTranslation()

  return (
    <Main>
      <div>
        <div className="mx-auto p-10 bg-white rounded-md shadow-md max-w-md">
          <FormRegisterUser
            isSignup
          />

          <div className='mt-2'>
            <Link to="/login">
              {t('signup.have-account')}
            </Link>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Signup