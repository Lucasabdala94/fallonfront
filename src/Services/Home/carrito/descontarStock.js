import { URL } from "../../../contants";

export default async function descontarStock(productId,productCartFinal,data){

    /*determinamos la cantidad que quedara el stock */
    
    let productoAnalizar = data?.find((dataProduct) => `${productId}` === `${dataProduct?.id}`);
    let cantidad= await (parseInt(productoAnalizar?.stock)-parseInt(productCartFinal)).toString()


    const method = {
        method:"PUT",
        body: JSON.stringify({"data":{
            "stock": cantidad ,
        }}),
        headers: {"Content-type": "application/json"}
    }

    /* Descuenta de la base de datos lo que se compro  */
    try {
        const url=`${URL}/products/${productId}`;
        const response = await fetch(url,method);
        const result = await response.json();
        return result; 
    } catch (error) {
        return null;
    }
}


