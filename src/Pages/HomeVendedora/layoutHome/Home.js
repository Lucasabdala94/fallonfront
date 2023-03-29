import React, { useEffect, useState } from "react";
import "./Home.css";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci"
import traerProductos from "../../../Services/Home/traerProductos";
import Product from "../../../Component/layout/product/Product";
import Loader from "../../../Component/Loader/Loader";
import Pagination from "../../../Component/layout/Pagination/Pagination";


export default function Home() {

    const [products, setProducts] = useState(null);
    const [page, setPage] = useState(1);
    const [arrayPage, setarrayPage] = useState(null);
    const [cantPage, setCantPage] = useState();


    useEffect(() => {
        (async () => {
            const response = await traerProductos(page);
            setProducts(response)
            setCantPage(response?.meta?.pagination?.pageCount)

        })()
    }, [page])

    useEffect(() => {
        let pages = [];
        if (cantPage) {
            for (let i = 1; i <= cantPage; i++) {
                pages.push(i)
            }
        }
        setarrayPage(pages)
    },[cantPage])


    const nextPage = () => {
        if (page !== cantPage) {
            setPage(page + 1)
        }
    }
    const previusPage = () => {
        if (page !== 1) {
            setPage(page - 1)
        }
    }
    console.log(arrayPage)
    return (
        <div className="home-contenedor">

            {products ?
                <>
                    <div className="contenedor-product">
                        {products?.data?.map((product) => {
                            return (
                                <div key={product.id} className="contenedor-producto" >
                                    {products &&
                                        <Product attributes={product} />
                                    }
                                </div>
                            )
                        })
                        }
                    </div>
                    {arrayPage &&
                        cantPage>=2 &&
                        <div className="contenedor-pagination" >
                            <button className="buton-pagination" onClick={previusPage}><CiCircleChevLeft className="text-bold" /></button>
                            <Pagination arrayPage={arrayPage} setPage={setPage} page={page} />
                            <button className="buton-pagination" onClick={nextPage}><CiCircleChevRight className="text-bold" /></button>
                        </div>
                    }

                </>
                : <Loader />
            }

        </div>
    )
}