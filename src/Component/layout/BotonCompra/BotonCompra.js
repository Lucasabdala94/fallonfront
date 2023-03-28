import React, { useState } from "react";
import useCartContext from "../../../hooks/useCartContext";
import useModal from "../../../hooks/useModal";
import Loader from "../../Loader/Loader";
import traerProductos from "../../../Services/Home/traerProductos";
import Modal from "../../modal/Modal";
import enviarPedido from "../../../Services/Home/carrito/enviarPedido";
import useAuth from "../../../hooks/useAuth";


export default function BotonCompra() {
    const [loaders, setLoaders] = useState(false);
    const [isOpenModal1, openModal1, closeModal1] = useModal(false);
    const { cart, clearCart,sumarCarritos } = useCartContext();

    const { user } = useAuth()

    async function handleCompra() {
        setLoaders(true);
        /*TRAEMOS PRODUCTOS DE LA DB*/
        try {
            const response = await traerProductos();

            /* Dato de todos los producto en la db */
            const data = response?.data.map(product => {
                return ({
                    id: product?.id,
                    stock: product.attributes.stock,
                    nombre: product.attributes.nombre,
                    precio:product.attributes.precioCompra,
                    tonoLetra:product.attributes.tonoLetra,
                })
            });
            /* Datos de productos en el carito */
            const dataCart = cart.map(productCart => {
                return (
                    {
                        idProduct: productCart?.item?.id,
                        cant: productCart?.quantity,
                        product: productCart?.item?.producto,
                        precio: productCart?.item?.precio,
                        tonoLetra:productCart?.item?.tonoLetra
                    }
                )
            })

            /*SE Actualiza el carrito del cliente con la cantidad de ese producto en stock antes de enviar pedido*/
            const cartFinal = await dataCart.map(
                (Element) => {
                    /* Separamos de los datos de la DB el producto que vamos analizar del carrito */
                    let productoAnalizar = data?.find((dataProduct) => `${Element?.idProduct}` === `${dataProduct?.id}`);

                    /*Evita que se compre un producto que se haya comprado */
                    if (productoAnalizar === undefined) {
                        return {
                            idProduct: Element?.idProduct,
                            cant: Element?.cant,
                            product: Element?.product,
                            precio:0,
                            faltante:true,
                            textoFaltante:`El producto ${Element?.product} ya no se encuentra a la venta`,
                        };
                    } else {
                        /* Cuando la cantidad del carrito es menor a la del DB devuelve el producto con la cant del carro, si es mayo lo devuelve con la cantidad de la base de la base de datos. */
                        if (parseInt(Element.cant) <= parseInt(productoAnalizar.stock)) {
                            return Element
                        } else {
                            /* caso donde se compra mas de lo que hay en la DB */
                            return {
                                idProduct: productoAnalizar.id,
                                cant: productoAnalizar.stock,
                                product: productoAnalizar.nombre,
                                precio:productoAnalizar.precio,
                                tonoLetra:productoAnalizar.tonoLetra,
                                faltante:true,
                                textoFaltante:`Los ${Element?.cant} productos ${Element?.product} solo quedaban en stock ${productoAnalizar.stock}`,

                            }
                        }
                    }
                }
            )

            const totalPagar=await sumarCarritos(cartFinal)
            try {

                //Hace el pedido con el carrito actualizado
                await enviarPedido(cartFinal, data,user,totalPagar);
                await openModal1(true)
                setTimeout(clearCart, 1200);
            } catch (error) {

            }
            setLoaders(false)
        } catch (error) {
            setLoaders(false)
        }   

    }



    return (
        <>
            {loaders ?
                <>
                    <Loader/>
                    <button className="button-login">Procesando Pedido</button>

                </>
                :
                <button className="button-login" onClick={handleCompra}>Realizar la Compra</button>

            }

            <Modal error={true} isOpen={isOpenModal1} closeModal={closeModal1}>
                <p className="errorModal">SE REALIZO EL PEDIDO EXITOSAMENTE</p>
            </Modal>

        </>

    )

}