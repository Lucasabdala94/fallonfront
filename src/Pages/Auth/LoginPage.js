import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const { login, resetPassword,user} = useAuth();
    const navigate =useNavigate();

    const [error, setError] = useState()
    const [DatoLogin, setDatoLogin] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(DatoLogin,setError,navigate);
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
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <picture>
                <img alt="Logo fallon" src=""></img>
            </picture>
            <form onSubmit={handleSubmit} >
                <input onChange={handleChange} type="text" name="email"></input>
                <input onChange={handleChange} type="password" name="password"></input>
                <button >Login</button>
            </form>
            <button onClick={handleResetPassword}>Olvidaste tu contraseña???.....</button>
        </div>
    )
}