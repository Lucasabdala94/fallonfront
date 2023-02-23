import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {

    const { login, resetPassword, user } = useAuth();
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
        if (!user.email) return setError("Ingresá el correo que desea  cambiar contraseña");

        await resetPassword(DatoLogin.email, setError)
    }

    return (
        <div className="Contenedor-centrado">
            <div className="Contenedor-formulario">
                
                
                <picture className="contenedor-logo">
                    <img className="logo-login" src={require("./../../assets/LogoFallon.png")} alt="logo" />
                </picture>
                <div className="contenedor-error">
                    {error && <p className="error">{error}</p>}
                </div>
                
                <form className="form-login" onSubmit={handleSubmit} >
                    <input className="form-login__input" onChange={handleChange} type="text" name="email"></input>
                    <input className="form-login__input" onChange={handleChange} type="password" name="password"></input>
                    <button >Login</button>
                </form>
                <button onClick={handleResetPassword}>Olvidaste tu contraseña???.....</button>
            </div>
        </div>
    )
}