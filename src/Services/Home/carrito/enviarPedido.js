import { URL } from "../../../contants";
import descontarStock from "./descontarStock";

export default async function enviarPedido(cartFinal, data,user,total) {

  try {
    const url = `${URL}/pedidos`;
    
    const method = {
      method: "POST",
      body: JSON.stringify({
        "data": {
          "pedido": cartFinal,
          "comprador": user?.email,
          "IdUser": user?.uid,
          "total":parseInt(total),
        }
      }),
      headers: { "Content-type": "application/json" }
    }
    /* Se envia el pedido */
    const response = await fetch(url, method);
    const result = await response.json();

    /* solo si se pudo registrar el pedido descontara de stock */
    if (result?.data?.attributes) {
      result?.data?.attributes?.pedido.map(async (product) => {
        if (product !== null) { 
          return await descontarStock(product?.idProduct, product?.cant, data) 
        }else{
          return null
        }
      }
      )
    }
    return result;

  } catch (error) {
    return null;
  }
}

