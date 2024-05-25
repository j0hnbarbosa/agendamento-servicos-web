import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import './App.css';
import { TempStateContextProvider } from '../../context/TempStateContenxt';

function App() {
  return (
    <div>
      <Navbar />

      <TempStateContextProvider>
        <Outlet />
      </TempStateContextProvider>
    </div>
  );
}

export default App;
