import { useState } from "react";
import useAuth from "../../../hooks/useAuth"
import actualizarCorreo from "../../../Services/Auth/actualizarCorreo";
import actualizarUsername from "../../../Services/Auth/actualizarUsername";



export default function Profile() {
    const [error, setError] = useState()
    const [error2, setError2] = useState()
    const { user } = useAuth()
    const [correo,setCorreo]= useState("")
    const [userName,setUserName]=useState("")

    const handleSubmitCorreo = async (e) => {
        e.preventDefault();
        if(correo.trim()==="") return setError("Debe ingresar un correo");
        if(correo.trim()===user.email) return setError("Debe ingresar un correo distinto al registrado");
        await actualizarCorreo(correo,setError)
        setCorreo("")
    }
    const handleSubmitUsername = async (e) => {
        e.preventDefault();
        if(userName.trim()==="") return setError2("Debe ingresar un Nombre de Usuario");
        if(userName.trim()===user.displayName) return setError2("Nombre ya registrado");
        await actualizarUsername(userName.trim(),setError2)
        setUserName("");
    }
    
    const changeCorreo= (e)=>{
        setCorreo(e.target.value);
    }
    const changeUsername= (e)=>{
        setUserName(e.target.value);
    }
    
    
    return (
        <div>
            <h2>Datos de usuario</h2>
            <form onSubmit={handleSubmitCorreo} >
                <h3>Correo Electronico</h3>
                <label name="correo">{user?.email}</label>
                <input type="text" name="correo" onChange={changeCorreo} value={correo} />
                <button type="submit">Actializar correo</button>
                {error && <p>{error}</p>}
            </form>
            <form onSubmit={handleSubmitUsername} >
                <h3>Nombre de Usuario</h3>
                <label name="userName">{user?.displayName ? user?.displayName : "No definido"
                }</label>
                <input name="userName" placeholder="Cambiar Nombre de usuario" value={userName} onChange={changeUsername}></input>
                <button type="submit">Cambiar Nombre de Usuario</button>
                {error2 && <p>{error2}</p>}
            </form>
        </div>

    )
}