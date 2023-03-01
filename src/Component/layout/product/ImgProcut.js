import React,{useState} from "react"

export default function ImgProduct(props) {
    const { attributes } = props;
    const imgs = attributes?.attributes?.imagen?.data;
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
            <div className="product-img-cont">
                <h4>{product.nombre}</h4>
                <img className="product-img" src={(imgs[0] !== null) ? imgs[0].attributes.url : "casa"} alt={attributes?.attributes.nombre} />
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