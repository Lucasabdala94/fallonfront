import React, { useEffect, useState } from "react";
import Product from "../../../Component/layout/product/Product";
import traerAllProduct from "../../../Services/Home/traerAllProduct";

export default function Oferta (){
    
    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await traerAllProduct();
            const data = response?.data;
            setProducts(data || null)
        })()
    }, [])
    return (
        <div className="contenedor-product">

            {products ?
                products?.map((product) => {
                    if(product.attributes.oferta===true){
                        return (
                            <div key={product.attributes.nombre} className="contenedor-producto" >
                                {products &&
                                    <Product attributes={product} />
                                }
                            </div>
                        )
                    }
                    return null

                }) :

                <div className="load-wrapp">
                    <div className="load-9">
                        <div className="spinner">
                            <div className="bubble-1"></div>
                            <div className="bubble-2"></div>
                        </div>
                        <div className="spinner-text">Cargando...</div>
                    </div>
                </div>
            }

        </div>
    )
}