import React from "react"

export default function ImgProduct(props) {

    const { attributes } = props;
    const imgs = attributes?.attributes?.imagen?.data;
    const product = attributes?.attributes
    console.log(product)
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
                <input type="number" min="1" max={`${product.stock}`} step={"1"} />
                <button>Agregar al carro</button>
            </div>
        </>


    )
}