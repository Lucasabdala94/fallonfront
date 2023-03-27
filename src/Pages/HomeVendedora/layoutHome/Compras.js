import { useEffect,useState } from "react";
import traercompras from "../../../Services/Home/compras/traerCompras"
import useAuth from "../../../hooks/useAuth"

export default function Compras (){
    const {user}=useAuth();
    const [compras,setCompras]=useState(null);

    useEffect(()=>{
        (async () => {
            const response = await traercompras(user?.uid);
            const compras=response?.data
            setCompras(compras)
        })()
        // eslint-disable-next-line
    },[])


    console.log(compras)

    return(
        <h1>Compras</h1>
       
    )
}