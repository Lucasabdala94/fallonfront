import { URL } from "../../contants"

export default async function traerAllProduct(){
    try {
        console.log("enciando consulta ")
        const url=`${URL}/products?populate=*`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        return null;
    }
}