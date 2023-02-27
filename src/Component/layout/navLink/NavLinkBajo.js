
import { NavLink, useResolvedPath } from "react-router-dom";
import "./NavLinkBajo.css";

export default function NavList() {

    //extraigo el patch para ponerle la clase active si coincide
    const path = useResolvedPath().pathname
    return (
      <nav className="navegadorBajo">
        <div>

        
        <div className="contenedorOpcionesBajo">
          <div className="opcionesBajo">
            <NavLink
              to="./oferta"
              className={path === "/home/oferta" ? "NavActiveBajo" : "NavInactivoBajo"}
            >
              ofertas
            </NavLink>
          </div>
          <div className="opcionesBajo">
            <NavLink
              to="./favoritos"
              className={path === "/home/favoritos" ? "NavActiveBajo" : "NavInactivoBajo"}
            >
              favoritos
            </NavLink>
          </div>
          <div className="opcionesBajo">
            <NavLink to="./carrito"
              className={path === "/home/carrito" ? "NavActiveBajo" : "NavInactivoBajo"}
            >
              Carrito
  
            </NavLink>
          </div>
        </div>
        </div>
      </nav>
    );
  }