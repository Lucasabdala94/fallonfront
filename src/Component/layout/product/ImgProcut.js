import React from "react"

export default function ImgProduct(props) {

    const {attributes}=props;
    const imgs=attributes?.attributes?.imagen?.data;
    return (
        <>
        <div className="product-img-cont">
            <img className="product-img" src={(imgs[0]!== null) ? imgs[0].attributes.url : "casa" }  alt={attributes?.attributes.nombre} />
            <h2>casa</h2>
        </div>
        </>
        

    )
}