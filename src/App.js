import { Route, Routes } from 'react-router-dom'

import './App.css';
import { AuthProvider } from './context/authContext';

import LoginPage from './Pages/Auth/LoginPage';
import RegistroPage from './Pages/Auth/RegistroPage'
import HomeVentaPage from './Pages/HomeVendedora/HomeVentaPage';
import HomeAdminPage from './Pages/HomeAdmin/HomeAdminPage';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomeVentaPage />}>
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
