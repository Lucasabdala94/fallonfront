import { Navigate } from "react-router-dom";

export default function LoginProtected({children}) {
    const Loged=localStorage.getItem("loged");
    if(!Loged) return <Navigate to='/' />

    return ( 
        <>{children}</>
    ); 
}