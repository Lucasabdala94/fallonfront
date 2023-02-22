import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NavList from "../../Component/layout/navLink/NavLink";


export default function HomeVentaPage() {
    const { logout } = useAuth();

    return (
        <>
            <header>
                <NavList />
                <button onClick={logout}>Logout</button>
            </header>
            <Outlet />
        </>

    )
}