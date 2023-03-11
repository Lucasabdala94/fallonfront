import { useState } from "react";
import useAuth from "../../../hooks/useAuth"
import actualizarCorreo from "../../../Services/Auth/actualizarCorreo";
import actualizarUsername from "../../../Services/Auth/actualizarUsername";
import "./Profile.css";


export default function Profile() {
    const [error, setError] = useState()
    const [error2, setError2] = useState()
    const { user } = useAuth()
    const [correo, setCorreo] = useState("")
    const [userName, setUserName] = useState("")

    const handleSubmitCorreo = async (e) => {
        e.preventDefault();
        if (correo.trim() === "") return setError("Debe ingresar un correo");
        if (correo.trim() === user.email) return setError("Debe ingresar un correo distinto al registrado");
        await actualizarCorreo(correo, setError)
        setCorreo("")
    }
    const handleSubmitUsername = async (e) => {
        e.preventDefault();
        if (userName.trim() === "") return setError2("Debe ingresar un Nombre de Usuario");
        if (userName.trim() === user.displayName) return setError2("Nombre ya registrado");
        await actualizarUsername(userName.trim(), setError2)
        setUserName("");
    }

    const changeCorreo = (e) => {
        setCorreo(e.target.value);
    }
    const changeUsername = (e) => {
        setUserName(e.target.value);
    }


    return (
        <div className="container-profile">
            <h2>Datos de usuario</h2>
            <h3 className="title-profile">Correo Electronico</h3>
            <form className="form-profile" onSubmit={handleSubmitCorreo} >
                <label name="correo">{user?.email}</label>
                <div>
                    <input type="text" name="correo" onChange={changeCorreo} value={correo} />
                    <button type="submit">Actializar correo</button>
                </div>
            </form>
            {error ?
                <div className="error-profile">{<p>{error}</p>}</div>
                :
                <div className="error-profile">{<p></p>}</div>
            }

            <h3 className="title-profile">Nombre de Usuario</h3>
            <form className="form-profile" onSubmit={handleSubmitUsername} >
                <label name="userName">{user?.displayName ? user?.displayName : "No definido"
                }</label>
                <div>
                    <input name="userName" placeholder="Cambiar Nombre de usuario" value={userName} onChange={changeUsername}></input>
                    <button type="submit">Actualizar Usuario</button>
                </div>
            </form>
            {error2 ?
                <div className="error-profile">{<p>{error2}</p>}</div>
                :
                <div className="error-profile">{<p></p>}</div>
            }
        </div>

    )
}