import { Outlet, Link, useResolvedPath } from "react-router-dom";
import { BsCart4,BsPersonFillX} from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import useCartContext from "../../hooks/useCartContext";
import NavList from "../../Component/layout/navLink/NavLink";
import NavListBajo from "../../Component/layout/navLink/NavLinkBajo";
import "./HomeVenta.css"

export default function HomeVentaPage() {
    const { logout } = useAuth();

    const { sumarCarrito } = useCartContext();
    const path = useResolvedPath().pathname;

    return (
        <>
            <header className="header">
                <div className="header-contenedor">
                    <picture className="logo">
                        <Link to={"./inicio"}>
                            <img className="logImagen" src={require("./../../assets/LogoFallon.png")} alt="logo" />
                        </Link>
                    </picture>
                    <NavList />
                    <button className="buton-header" onClick={logout}><BsPersonFillX/> Salir</button>
                    {   
                        path !== "/home/carrito" && 
                        <Link to={"./carrito"}>
                            <button className="boton-carrito"><BsCart4 /><p>${sumarCarrito()}</p> </button>
                        </Link>
                    }

                </div>
            </header>
            <div>
                <NavListBajo />
            </div>
            <Outlet />
        </>

    )
}