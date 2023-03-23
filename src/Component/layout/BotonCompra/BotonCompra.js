import React, { useState } from "react";
import useCartContext from "../../../hooks/useCartContext";
import useModal from "../../../hooks/useModal";
import Loader from "../../Loader/Loader";
import traerProductos from "../../../Services/Home/traerProductos";
import Modal from "../../modal/Modal";
/* import enviarPedido from "../../../Services/Home/carrito/enviarPedido"; */

export default function BotonCompra() {
    const [loaders, setLoaders] = useState(false);
    const [isOpenModal1, openModal1, closeModal1] = useModal(false);
    const [faltante, setFaltante] = [];
    const { cart, clearCart } = useCartContext();

    async function handleCompra() {
        setLoaders(true);
        const response = await traerProductos();
        const data = response?.data.map(product => {
            return ({
                id: product?.id,
                stock: product.attributes.stock,
                nombre: product.attributes.nombre
            })
        });

        const dataCart = cart.map(productCart => {
            return (
                {
                    idCart: productCart?.item?.id,
                    cantCart: productCart?.quantity,
                    product: productCart?.item?.producto,
                }
            )
        })

        const cartFinal = await dataCart.map(
            (Element) => {
                let productoAnalizar = data.find((dataProduct) => `${Element.idCart}` === `${dataProduct.id}`);
                if (parseInt(Element.cantCart) <= parseInt(productoAnalizar.stock)) {
                    return Element
                } else {
                    setFaltante(...faltante,"nuevo faltante")
                    return productoAnalizar
                }
            }

        )

        /* const envioPedido=enviarPedido(cartFinal); */

        

        await openModal1(true)
        setTimeout(clearCart, 1000);
        setLoaders(false)
    }



    return (
        <>
            {loaders ?
                <>
                    <button className="button-login" onClick={handleCompra}>Procesando Pedido</button>
                    <Loader />

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