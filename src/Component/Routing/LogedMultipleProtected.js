import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LogedMultipleProtected({children}) {
    const[Loged,]=useState(localStorage.getItem("loged"));

    if(Loged) return <Navigate to='/home/inicio' />
    return ( 
        <>{children}</>
    ); 
}