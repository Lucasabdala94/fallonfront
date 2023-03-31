import { useEffect, useState } from "react";
import traercompras from "../../../Services/Home/compras/traerCompras"
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Component/Loader/Loader";

export default function Compras() {
    const { user } = useAuth();
    const [compras, setCompras] = useState(null);

    useEffect(() => {
        (async () => {
            if(user!==null){
                const response = await traercompras(user?.uid);
                const compras = await response?.data
                setCompras(compras)
            }
        })()
        // eslint-disable-next-line
    }, [user])
    
    return (
        <div className="contenedor-carrito">
            {compras !== null ?
                compras?.map(pedido =>
                    <div className="contenedor-compra" key={pedido.id} >
                        <table key={pedido.id} className="table-cart">
                            <thead >
                                <tr>
                                    <th>Cantidad</th>
                                    <th>Productos</th>
                                    <th>Precio u.</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido?.attributes?.pedido.map((product) => {
                                    return (
                                        product?.precio !== 0 &&

                                        <tr className="text-center" key={product.idProduct
                                        }>
                                            <td>
                                                {product.cant}
                                            </td>
                                            <td >
                                                {product.product}
                                            </td>
                                            <td>
                                                {product.precio}
                                            </td>
                                            <td>
                                                {parseInt(product.cant) * parseInt(product.precio)}
                                            </td>
                                        </tr>
                                        
                                    )
                                })}
                                {pedido?.attributes?.pedido.map((productFaltante)=>{
                                    return(
                                        productFaltante?.faltante === true &&
                                        <tr className="text-center " key={productFaltante.idProduct
                                        }>
                                            <td colSpan="3" className="margin-top-5">
                                                {productFaltante.textoFaltante}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="cont-totalPagar margin-boton-15"><p className="totalPagar">{`Total $ ${pedido?.attributes?.total}`}</p></div>
                    </div>
                ) :
                <Loader />
            }
        </div>
    )
}