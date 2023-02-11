import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


export default function Register() {
    const [dataRegister, setDataRegister] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState()

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setDataRegister({ ...dataRegister, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(dataRegister,setError,navigate)

    }

    return (
        <div >
            {error && <p >{error}</p>}
            <form  onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />
                <button  onSubmit={handleSubmit}>Registrar</button>
            </form>
            
        </div>

    );
}
