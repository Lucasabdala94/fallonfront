import { createContext, useEffect, useState,useMemo } from "react";
import {  onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from "../firebase";
import resetPasswordService from "../Services/Auth/resetPassword";
import loginService from "../Services/Auth/login";
import registerService from "../Services/Auth/register";

export const authContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signup = (dataRegister,setError) => registerService(dataRegister,setError)

    const login = async (DatoLogin,setError,navigate) => {
        await loginService( DatoLogin,setError,navigate)
        localStorage.setItem("loged",true)
    };

    const logout = () => signOut(auth);

    const resetPassword = async (email, setError) =>  resetPasswordService(email,setError)
    
    
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
        ),[user]
    )

    return (
        <authContext.Provider value={authData}>
            {children}
        </authContext.Provider>
    )
}