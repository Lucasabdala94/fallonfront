import {signOut} from "firebase/auth"
import {auth} from "../../firebase"

export default function logoutService(navigate){
    signOut(auth).then(
        localStorage.removeItem("loged"),
        navigate("/"))
}