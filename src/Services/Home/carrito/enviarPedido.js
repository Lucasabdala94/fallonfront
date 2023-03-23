import { URL } from "../../contants"

export default async function enviarPedido({ carrito }) {
    try {
        const url = `${URL}/products?populate=*`;

        const method = {
            method:"POST",
            body: JSON.stringify(carrito),
            headers: {"Content-type": "application/json"}
        }

    const response = await fetch(url,method);
    const result = await response.json();
    return result;
        
    } catch (error) {
    return null;
}
}