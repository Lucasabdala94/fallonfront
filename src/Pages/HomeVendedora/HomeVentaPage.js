import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function HomeVentaPage() {
    const{user}=useAuth();
    console.log(user)
    return (
        <>
            <h1>Home vendedora</h1>
            <Outlet />
        </>

    )
}