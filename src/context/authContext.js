import { createContext, useEffect, useState, useCallback,useMemo} from "react";
import { onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import resetPasswordService from "../Services/Auth/resetPassword";
import loginService from "../Services/Auth/login";
import registerService from "../Services/Auth/register";
import logoutService from "../Services/Auth/logout"

export const authContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const signup = (dataRegister, setError) => registerService(dataRegister, setError)

    const login = async (DatoLogin, setError, navigate) => {
        await loginService(DatoLogin, setError, navigate)
        localStorage.setItem("loged", true)
    };
    
    const logout =useCallback(() => logoutService(navigate),[navigate])


    const resetPassword = async (email, setError) => resetPasswordService(email, setError)


    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
        })
    }, [user])
    
    const authData= useMemo(
        ()=>({
            user,
            login,
            logout,
            resetPassword,
            signup,
        }
        ),[user,logout]
    )

    return (
        <authContext.Provider value={authData}>
            {children}
        </authContext.Provider>
    )
}