import { useContext } from "react"
import "./Navbar.css"
import { BridgeGuardContext } from "../../context/BridgeGuard"
import { Link } from 'react-router-dom'

function Navbar() {

  const {
    isToShow,
    handleLougout
  } = useContext(BridgeGuardContext)

  return (
    <div className="navbar mb-8">
      <h1 className="navbar-brand">Barbearia</h1>
      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          {isToShow && <li><Link to={"/availableTime"} >Cadastrar Horario</Link></li>}
          {isToShow && <li><Link to={"/workType"} >Cadastrar Tipo trabalho</Link></li>}
          {isToShow && <li><Link to="/admin" >Usuário</Link></li>}

          {isToShow && <li><button className="p-0" onClick={handleLougout}>Logout</button></li>}
          {!isToShow && <li><Link to="/login">Login</Link></li>}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar