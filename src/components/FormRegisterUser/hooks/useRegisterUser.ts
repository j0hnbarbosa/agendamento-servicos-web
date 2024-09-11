import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import api from '@/services/api'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export interface RegisterUserProps {
  isSignup?: boolean
  onClose?: () => void
  values?: {
    id: number
    name: string
    email: string
    isProvider: boolean
  }
  isEdit?: boolean
  refetchUsers?: () => Promise<void>
}

type InputProps = ChangeEvent<HTMLInputElement>
type FormProps = FormEvent<HTMLFormElement>

export const useRegisterUser = (props: RegisterUserProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isProvider, setIsProvider] = useState(false)
  const [error, setError] = useState('')

  const {
    isSignup = false,
    onClose,
    values,
    isEdit,
    refetchUsers,
  } = props

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

  const handleCreateUser = async () => {
    if (!password.trim()) {
      setError(`${t('signup.password-validation')}`)
      return
    }

    const res = await api.post('/createUser', { name, email, password, isProvider })

    if (res?.data?.error === 'Validation error') {
      setError(`${res?.data?.error || ''} - ${t('signup.email-error')}`)
      console.log('res?.data', res?.data)
    } else if (isSignup) {
      navigate('/login')
    } else {
      onClose()
    }
  }

  const handleEditUser = async () => {
    const dataToSave = {
      name,
      email,
      password,
      isProvider
    }

    if (!password.trim()) {
      delete dataToSave.password
    }

    const res = await api.put(`/updateUser/${values.id}`, dataToSave)

    if (res?.data?.error === 'Validation error') {
      setError(`${res?.data?.error || ''} - ${t('signup.email-error')}`)
      console.log('res?.data', res?.data)
    } else {
      onClose()
    }
  }

  const handleSubmit = async (e: FormProps) => {
    e.preventDefault()
    try {
      setError('')

      if (!isEdit) {
        if (!password.trim()) {
          setError(`${t('signup.password-validation')}`)
          return
        }

        await handleCreateUser()
      } else {
        await handleEditUser()
      }

      await refetchUsers()
    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (values) {
      setName(values.name)
      setEmail(values.email)
      setIsProvider(values.isProvider)
    }
  }, [])

  return ({
    name,
    email,
    password,
    isProvider,
    error,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleIsProviderChange,
    handleSubmit
  })
}
