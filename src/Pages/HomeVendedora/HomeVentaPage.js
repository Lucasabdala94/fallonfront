import { Outlet,Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NavList from "../../Component/layout/navLink/NavLink";
import NavListBajo from "../../Component/layout/navLink/NavLinkBajo";
import "./HomeVenta.css"


export default function HomeVentaPage() {
    const { logout } = useAuth();

    return (
        <>
            <header className="header">
                <div className="header-contenedor">
                    <picture className="logo">
                    <Link to={"./inicio"}>
                        <img className="logImagen" src={require("./../../assets/LogoFallon.png")} alt="logo"/>
                    </Link>
                    </picture>
                    <NavList />
                    <button className="buton-header" onClick={logout}>Salir</button>
                </div>
            </header>
            <div>
                <NavListBajo/>
            </div>
            <Outlet />
        </>

    )
}