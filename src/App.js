import { Route, Routes } from 'react-router-dom'

import './App.css';
import { AuthProvider } from './context/authContext';

import LoginPage from './Pages/Auth/LoginPage';
import RegistroPage from './Pages/Auth/RegistroPage'
import HomeVentaPage from './Pages/HomeVendedora/HomeVentaPage';
import HomeAdminPage from './Pages/HomeAdmin/HomeAdminPage';

//rutas vendedora
import Carrito from "./Pages/HomeVendedora/layoutHome/Carrito";
import Compras from "./Pages/HomeVendedora/layoutHome/Compras";
import Oferta from "./Pages/HomeVendedora/layoutHome/Oferta";
import Profile from "./Pages/HomeVendedora/layoutHome/Profile";


import LoginProtected from './Component/Routing/LoginProtectedRoute';
import LogedMultipleProtected from './Component/Routing/LogedMultipleProtected';

function App() {
  return (
    <AuthProvider>
      <div className='apps'>
        <Routes>
          <Route path='/' element={<LogedMultipleProtected><LoginPage /></LogedMultipleProtected>} />
          <Route path='/home' element={<LoginProtected><HomeVentaPage /></LoginProtected>}>
            <Route path='carrito' element={<Carrito/>}/> 
            <Route path='compras' element={<Compras/>}/>
            <Route path='oferta' element={<Oferta/>}/>
            <Route path='profile' element={<Profile/>}/>
          </Route>
          <Route path='/admin' element={<HomeAdminPage />} >
            <Route path="registro" element={<RegistroPage />} />
          </Route>

        </Routes>

      </div>
    </AuthProvider>

  );
}

export default App;
