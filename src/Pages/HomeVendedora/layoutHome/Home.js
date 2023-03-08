import React, { useEffect, useState } from "react";
import "./Home.css";

import traerProductos from "../../../Services/Home/traerProductos";
import Product from "../../../Component/layout/product/Product";


export default function Home() {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await traerProductos();
            const data = response?.data;
            setProducts(data || null)
        })()
    }, [])


    return (
        <div className="home-contenedor">

            {products ?
                products?.map((product) => {
                    return (
                        <div key={product.attributes.nombre} className="contenedor-producto" >
                            {products &&
                                <Product attributes={product} />
                            }
                        </div>
                    )

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