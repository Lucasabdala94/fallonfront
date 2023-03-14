import { useContext } from "react";
import { cartContext } from "../context/cartContext";

// eslint-disable-next-line
export default ()=>{
    const  carritoContext = useContext(cartContext);
    if (!carritoContext) throw new Error('There is not cartProvider provider')
    return carritoContext;
}












/* import { useContext} from "react";
import { authContext } from "../context/authContext";
// eslint-disable-next-line
export default ()=>{
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider')
    return context;
} */