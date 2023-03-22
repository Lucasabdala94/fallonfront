import React, { useEffect } from "react";
import "./Carrito.css";
import { BiX } from "react-icons/bi";
import useCartContext from "../../../hooks/useCartContext";

export default function Carrito() {

    const { cart, clearCart, removeProduct, sumarCarrito } = useCartContext();

    const deleteCart = () => {
        clearCart();
    }

    useEffect(() => {

    }, [cart])

    return (
        <div className="contenedor-carrito">

            {cart ?
                <>
                    <table className="table-cart">
                        <thead >
                            <tr>
                                <th>Cantidad</th>
                                <th>Productos</th>
                                <th>Precio u.</th>
                                <th>Subtotal</th>
                                <th>Quitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.map((product) => {
                                return (
                                    <tr className="text-center"  key={product.item.id}>
                                        <td>
                                            {product.quantity}
                                        </td>
                                        <td >
                                            {product.item.producto}
                                        </td>
                                        <td>
                                            {product.item.precio}
                                        </td>
                                        <td>
                                            {parseInt(product.item.precio)*parseInt(product.quantity)}
                                        </td>
                                        <td>
                                            <button
                                                className="button-removeProduct"
                                                onClick={() => removeProduct(product.item.id)}
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

                    <div className="cont-totalPagar"><p className="totalPagar"> Total ${sumarCarrito()}</p></div>

                    <div><button className="button-login " onClick={deleteCart}>Limpiar carro</button></div>
                </>
                :
                <div className="carrito-vacio" >
                    No Hay Productos en el Carrito
                </div>

            }

        </div>
    )
}