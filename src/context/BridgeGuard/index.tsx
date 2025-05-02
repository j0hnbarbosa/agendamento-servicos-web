import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import api, { handleSetToken } from '@/services/api'
import { useNavigate } from 'react-router-dom'
import { TempStateContext } from '../TempStateContenxt'

interface BridgeGuardProviderProps {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  isToShow: boolean
  setIsToShow: (isToShow: boolean) => void
  handleLougout: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  email: string
  password: string
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string
  isDisabled: boolean,
  navigate: (path: string, options?: { replace: boolean }) => void
}
export const BridgeGuardContext = createContext({} as BridgeGuardProviderProps)

export const BridgeGuardProvider = ({ children }: { children: ReactNode }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isToShow, setIsToShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const {
    showToast
  } = useContext(TempStateContext)

  const isDisabled = email === '' || password === ''

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setError('')

      const res = await api.post('/login', { email, password })

      if (!res.data.token) {
        setError('Email or password is incorrect.')
        localStorage.removeItem('isAuthenticated')

        return
      }

      localStorage.setItem('isAuthenticated', 'true')

      handleSetToken(res.data.token)

      navigate('web-agenda/admin', { replace: true })

      setEmail('')
      setPassword('')
      setError('')
    } catch (error) {
      console.log(error)

      showToast({
        message: JSON.stringify(error),
        type: 'error'
      })
    }
  }

  const handleLougout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    setIsToShow(false)
    navigate('/web-agenda/login', { replace: true })
  }

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isToShow,
    setIsToShow,
    handleLougout,
    handleSubmit,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    error,
    isDisabled,
    navigate
  }

  // Authenticated logic.
  // When the user reload the screen it should call the token in the local storage to check if the user is authenticated.
  // Will be called only once.
  useEffect(() => {
    const isAuthenticatedLocal = localStorage.getItem('isAuthenticated')

    if (isAuthenticatedLocal === 'true' && !isAuthenticated) {
      setIsAuthenticated(true)
      setIsToShow(true)
    } else if (!isAuthenticatedLocal && isAuthenticated) {
      setIsAuthenticated(false)
      setIsToShow(false)
      navigate('/web-agenda/login', { replace: true })
    }
  })

  return (
    <BridgeGuardContext.Provider value={value}>
      {children}
    </BridgeGuardContext.Provider>
  )
}

