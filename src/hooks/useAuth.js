import { useContext} from "react";
import { authContext } from "../context/authContext";
// eslint-disable-next-line
export default ()=>{
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider')
    return context;
}