import React, { useState } from 'react'
import api from '@/services/api'
import { Link } from 'react-router-dom'

type InputProps = React.ChangeEvent<HTMLInputElement>
type FormProps = React.FormEvent<HTMLFormElement>

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isProvider, setIsProvider] = useState(false)
  const [error, setError] = useState('')

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
        setError(`${res.data.error} - Email already in use.`)
        return
      } else {
        window.location.href = '/login'
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
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Senha</label>
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
              Prestador de serviços?
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

          <button type="submit">Cadastro</button>
        </form>

        <div className='mt-2'>
          <Link to="/login">Fazer login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup