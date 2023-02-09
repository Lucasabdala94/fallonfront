import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from "../firebase";
import resetPasswordService from "../Services/Auth/resetPassword";


export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider')
    return context;
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const resetPassword = async (email, setError) => {
        setError("")
        resetPasswordService(email,setError)
    }

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
    }, [])

    return (
        <authContext.Provider value={{ signup, login, logout, resetPassword, user }}>
            {children}
        </authContext.Provider>
    )
}