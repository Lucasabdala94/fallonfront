import { useState } from "react";
import useAuth from "../../../hooks/useAuth"
import actualizarCorreo from "../../../Services/Auth/actualizarCorreo";

export default function Profile() {
    const [error, setError] = useState()
    const { user } = useAuth()
    const [correo,setCorreo]= useState("")
    
    const handleSubmitCorreo = async (e) => {
        e.preventDefault();
        await actualizarCorreo(correo,setError);
    }
    const changeCorreo= (e)=>{
        setCorreo(e.target.value);
    }
    return (
        <div>
            <h2>Datos de usuario</h2>
            <form onSubmit={handleSubmitCorreo} >
                <h3>Correo Electronico</h3>
                <label name="correo">{user?.email}</label>
                <input type="text" name="correo" onChange={changeCorreo} />
                <button type="submit">Actializar correo</button>
                {error && <p>{error}</p>}
            </form>
            <form >
                <h3>Nombre de Usuario</h3>
                <label name="correo">{user?.displayName ? user?.displayName : "No definido"
                }</label>
                <input name="correo" placeholder="Cambiar Nombre de usuario"></input>
                <button type="submit">Cambiar Nombre de Usuario</button>
            </form>


        </div>

    )
}