import React,{useState} from "react"

import CarrouselProduct from "./CarrouselProduct";
import "./Product.css";

export default function Product(props) {
    const { attributes } = props;
    const product = attributes?.attributes;

    const [cantidad,setCantidad]= useState("");
    const [error,setError]= useState(null);

    const handleSubmitCantidad = (e) => {
        e.preventDefault();
        setError("")
        if(parseInt(cantidad.trim()< 0)) return setError("Debe ingresar una cantidad minima");
        if(cantidad.trim()==="") return setError("Debe ingresar una cantidad minima");
        if(parseInt(cantidad.trim())>product.stock) return setError("Cantidad Mayor a la disponible");
    }

    const changeCantidad= (e)=>{
        setCantidad(e.target.value);
    }

    return (
        <>
            <div className="product-cont">
                <h4 className="product-title">{product.nombre}</h4>
                <CarrouselProduct attributes={attributes} />
                <p>{product.descripciopnCorta}</p>
                <div style={{
                    background: product.tono,
                    width: "25px",
                    height: "25px",
                    borderRadius:"50%",
                    border: "solid 0.3px rgb(0,0,0)",
                }}/>
                <p>Stock:{product.stock}</p>
                <p>${product.precioCompra}</p>
                <input value={cantidad} name="cantidad" onChange={changeCantidad} type="number" min="1" max={`${product.stock}`} step={"1"}></input>
                <button type="submit" onClick={handleSubmitCantidad}>Agregar al carro</button>
                {error && <p>{error}</p>}
            </div>
        </>


    )
}