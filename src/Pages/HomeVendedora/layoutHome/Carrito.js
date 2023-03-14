import React,{useEffect} from "react";
import "./Carrito.css";
import { BiX } from "react-icons/bi";
import useCartContext from "../../../hooks/useCartContext";

export default function Carrito() {

    const { cart,clearCart,removeProduct } = useCartContext();

    const deleteCart = ()=>{
        clearCart();
    }
    /* const removeItem=()=>{
        removeProduct();
    } */

    useEffect(()=>{
            
    },[cart])

    return (
        <div className="contenedor-carrito">

            {cart ?
                <>
                    <table className="table-cart">
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Productos</th>
                                <th>Precio</th>
                                <th>------</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.map((product) => {
                                return (
                                    <tr key={product.item.id}>
                                        <td className="text-center" >
                                            {product.quantity}
                                        </td>
                                        <td >
                                            {product.item.producto}
                                        </td>
                                        <td className="text-center" >
                                            {product.item.precio}
                                        </td>
                                        <td className="text-center">
                                            <button 
                                                onClick={()=>removeProduct(product.item.id)}  
                                            >
                                                <BiX />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    <div><button onClick={deleteCart}>Limpiar carro</button></div>
                </>
                :
                <div className="carrito-vacio" >
                    No hay productos en el carrito
                </div>

            }

        </div>
    )
}