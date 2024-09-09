import React, { useState } from 'react'
import api from '@/services/api'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type InputProps = React.ChangeEvent<HTMLInputElement>
type FormProps = React.FormEvent<HTMLFormElement>

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isProvider, setIsProvider] = useState(false)
  const [error, setError] = useState('')

  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleNameChange = (e: InputProps) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: InputProps) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: InputProps) => {
    setPassword(e.target.value)
  }

  const handleIsProviderChange = (e: InputProps) => {
    setIsProvider(e.target.checked)
  }

  const handleSubmit = async (e: FormProps) => {
    e.preventDefault()
    try {
      setError('')
      const res = await api.post('/createUser', { name, email, password, isProvider })

      if (res?.data?.error) {
        setError(`${res.data.error} - ${t('signup.email-error')}`)
        return
      } else {
        navigate('/login')
      }
    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error)
    }
  }

  return (
    <div>
      <div className="mx-auto p-10 bg-white rounded-md shadow-md max-w-md">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Cadastro</h2>
          <div className="mb-4">
            <label htmlFor="name">
              {t('signup.name')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email">
              {t('signup.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">
              {t('signup.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="isProvider"
              className='select-none flex items-center whitespace-nowrap hover:cursor-pointer'
            >
              {t('signup.is-provider')}
              <input
                type="checkbox"
                id="isProvider"
                checked={isProvider}
                className='w-fit ml-3 hover:cursor-pointer'
                onChange={handleIsProviderChange}
              />
            </label>
          </div>

          {
            error && <div className="text-red-700 py-3 font-bold text-sm">{error}</div>
          }

          <button type="submit">
            {t('signup.signup-btn')}
          </button>
        </form>

        <div className='mt-2'>
          <Link to="/login">
            {t('signup.have-account')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup