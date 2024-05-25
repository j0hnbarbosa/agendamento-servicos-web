import { useContext } from 'react';
import './Login.css';
import { BridgeGuardContext } from '../../context/BridgeGuard';

const Login = () => {

  const {
    handleSubmit,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    error,
    isDisabled
  } = useContext(BridgeGuardContext)

  return (
    <div>
      <div className="container max-w-md">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
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
        <a href="/signup">Não tem uma conta? Cadastre-se</a>
      </div>
    </div>
  );
};

export default Login;