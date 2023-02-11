import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export default function HomeVentaPage() {
    const{logout}=useAuth();
    

    return (
        <>
            <h1>Home vendedora</h1>
            <button onClick={logout}>Logout</button>
            <Outlet />
        </>

    )
}