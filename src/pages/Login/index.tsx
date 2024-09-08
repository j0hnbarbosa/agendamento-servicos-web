import { useContext } from 'react'
import { BridgeGuardContext } from '../../context/BridgeGuard'
import { Link } from 'react-router-dom'

const Login = () => {

  const {
    handleSubmit,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    error,
    isDisabled,
  } = useContext(BridgeGuardContext)

  return (
    <div>
      <div className="mx-auto p-10 bg-white rounded-md shadow-md max-w-md">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          {
            error && <div className="text-red-700 py-3 font-bold text-sm">{error}</div>
          }

          <button disabled={isDisabled} type="submit">Login</button>
        </form>

        <div className='mt-2'>
          <Link to="/signup">Não tem uma conta? Cadastre-se</Link>
        </div>
      </div>
    </div>
  )
}

export default Login