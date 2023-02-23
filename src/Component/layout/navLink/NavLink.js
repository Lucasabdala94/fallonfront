import "./Navlink.css"

import { NavLink, useResolvedPath } from "react-router-dom";
export default function NavList() {

  //extraigo el patch para ponerle la clase active si coincide
  const path = useResolvedPath().pathname
  return (
    <nav className="navegador">
      <ul className="contenedorOpciones">
        <li className="opciones">
          <NavLink
            to="./"
            className={path === "/home/" || path === "/home" ? "NavActive" : "NavInactivo"}
          >
            Home
          </NavLink>
        </li>
        <li className="opciones">
          <NavLink
            to="./compras"
            className={path === "/home/compras" ? "NavActive" : "NavInactivo"}
          >
            Compras
          </NavLink>
        </li>
        <li className="opciones">
          <NavLink to="profile"
            className={path === "/home/profile" ? "NavActive" : "NavInactivo"}
          >
            Perfil

          </NavLink>
        </li>
      </ul>
    </nav>
  );
}