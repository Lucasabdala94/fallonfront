import React, { useState } from "react"
import { TiShoppingCart } from "react-icons/ti"
import { BiCheck, BiX } from "react-icons/bi"
import CarrouselProduct from "./CarrouselProduct";
import "./Product.css";
import Modal from "../../modal/Modal";
import useModal from "../../../hooks/useModal";
import useCartContext from "../../../hooks/useCartContext";

export default function Product(props) {
    const { attributes } = props;
    const product = attributes?.attributes;

    const { addProduct, isToCart, removeProduct, isToCantidad, isOffert } = useCartContext()
    const [id,] = useState(attributes.id);

    const [cantidad, setCantidad] = useState(isToCantidad(attributes.id));
    const [error, setError] = useState(null);

    const [isOpenModal1, openModal1, closeModal1] = useModal(false);

    const handleSubmitCantidad = (e) => {
        e.preventDefault();
        setError("")
        if (typeof (parseInt(cantidad.trim())) !== "number") {
            setError("Debe ingresar un numero entero como Cantidad")
            setCantidad("")
            return openModal1(true)
        }
        if (parseInt(cantidad.trim()) <= 0) {
            setError("Debe ingresar una cantidad minima");
            return openModal1(true)
        }
        if (cantidad.trim() === "") {
            setError("Debe ingresar una cantidad minima")
            return openModal1(true);
        }
        if (parseInt(cantidad.trim()) > product.stock) {
            setError("Cantidad Mayor a la disponible");
            return openModal1(true);
        }

        addProduct({
            id: attributes.id,
            tono: product.tono,
            producto: product.nombre,
            precio: product.precioCompra,
            offert: product.oferta,
        }, cantidad.trim())
    }

    const changeCantidad = (e) => {
        setCantidad(e.target.value);
    }

    return (
        <>
            <div className="product-cont">
                {isOffert(attributes) === true &&
                    <picture className="logoOferta">
                        <img className="logoOferta-img" src={require("./../../../assets/oferta.png")} alt="logo oferta" />
                    </picture>
                }
                <h4 className="product-title">{product.nombre}</h4>
                <CarrouselProduct attributes={attributes} />
                <p className="descripcionCorta">{product.descripciopnCorta}</p>
                <div className="caracteristicas">
                    {product?.tono !== null ?
                        <>
                            <div className="contenedor-stock">
                                <p className="stock">Stock :   {product.stock}</p>
                                <p className="stock">{product?.tonoLetra}</p>
                            </div>
                            <div style={{
                                background: product.tono,
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                border: "solid 0.2px rgb(0,0,0)",
                                userSelect: "none",
                            }} />
                        </>
                        :
                        <>
                            <div className="contenedor-stock">
                                <p className="stock"> Stock :  {product.stock}</p>
                            </div>
                            <div className="contenedor-stock">
                                <p className="stock">{product?.tonoLetra}</p>
                            </div>

                        </>
                    }
                    <p className="precio">${product.precioCompra}</p>
                </div>
                <form className="form-cantidad" onSubmit={handleSubmitCantidad}>
                    <input value={cantidad} name="cantidad" onChange={changeCantidad}></input>
                    {isToCart(attributes.id) === false ?
                        <button type="submit" ><TiShoppingCart /></button>
                        :
                        <>
                            <button type="submit" ><BiCheck className="green" /></button>
                            <div onClick={() => {
                                removeProduct(id)
                                setCantidad("")
                            }
                            }>
                                <BiX className="remove-product" />
                            </div>
                        </>

                    }

                </form>


                <Modal error={true} isOpen={isOpenModal1} closeModal={closeModal1}>
                    <p className="errorModal">{error}</p>
                </Modal>
            </div>
        </>


    )
}