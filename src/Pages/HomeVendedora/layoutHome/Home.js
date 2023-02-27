import React, { useEffect, useState } from "react";
import "./Home.css";

import traerProductos from "../../../Services/Home/traerProductos";
import ImgProduct from "../../../Component/layout/product/ImgProcut";


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
            <h1>Productos</h1>
            {products &&
                products?.map((product) => {
                    return (
                        <div key={product.attributes.nombre} className="contenedor-producto" >
                            <h4>{product.attributes.nombre}</h4>
                            {products &&
                                <ImgProduct attributes={product} />
                            }
                        </div>
                    )

                })
            }

        </div>
    )
}