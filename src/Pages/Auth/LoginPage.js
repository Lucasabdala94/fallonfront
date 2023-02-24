import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {

    const { login, resetPassword } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState()
    const [DatoLogin, setDatoLogin] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(DatoLogin, setError, navigate);
    }

    //registra cambios en formularios
    const handleChange = ({ target: { name, value } }) => {
        setDatoLogin({ ...DatoLogin, [name]: value })
    }


    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (!DatoLogin?.email || DatoLogin?.email===null) return setError("Ingresá el correo que desea cambiar contraseña");

        await resetPassword(DatoLogin.email, setError)
    }

    return (
        <div className="Contenedor-centrado">
            <div className="Contenedor-formulario">
                <div className="contenedor-logo">
                    <img className="logo-login" src={require("./../../assets/LogoFallon.png")} alt="logo" />
                </div>
                <div className="contenedor-error">
                    {error && <p className="error">{error}</p>}
                </div>
                
                <form className="form-login" onSubmit={handleSubmit} >
                    <input className="form-login__input" placeholder="correo@gmail.com" onChange={handleChange} type="text" name="email"></input>
                    <input className="form-login__input" placeholder="contraseña" onChange={handleChange} type="password" name="password"></input>
                    <button className="button-login" >Ingresar</button>
                </form>
                <button className="button-reset" onClick={handleResetPassword}>Olvidaste tu contraseña?</button>
            </div>
        </div>
    )
}