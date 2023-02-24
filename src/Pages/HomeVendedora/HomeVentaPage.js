import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NavList from "../../Component/layout/navLink/NavLink";
import "./HomeVenta.css"


export default function HomeVentaPage() {
    const { logout } = useAuth();

    return (
        <>
            <header className="header">
                <div className="header-contenedor">
                    <picture className="logo">
                        <img className="logImagen" src={require("./../../assets/LogoFallon.png")} alt="logo"/>
                    </picture>
                    <NavList />
                    <button className="buton-header" onClick={logout}>Salir</button>
                </div>
                
            </header>
            <Outlet />
        </>

    )
}