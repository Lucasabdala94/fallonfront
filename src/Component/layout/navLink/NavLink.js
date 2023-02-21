import { NavLink,useResolvedPath } from "react-router-dom";
import "./Navlink.css"
export default function NavList() {

//extraigo el patch para ponerle la clase active si coincide
const path=useResolvedPath().pathname

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="./"
            className={path==="/home/" ? "NavActive" : undefined }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="./compras"
            className={path==="/home/compras" ? "NavActive" : undefined }
          >
            Compras
          </NavLink>
        </li>
        <li>
          <NavLink to="profile">
            {({ isActive }) => (
              <span
              className={path==="/home/profile" ? "NavActive" : undefined }
              >
                Profile
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}