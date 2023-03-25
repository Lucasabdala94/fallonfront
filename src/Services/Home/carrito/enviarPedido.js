import { URL } from "../../../contants"

export default async function enviarPedido(carrito) {
    try {
        const url = `${URL}/pedidos`;

        const method = {
            method:"POST",
            body: JSON.stringify({"data":{
                "pedido": carrito,
                "comprador": "lucas abdala"
            }}),
            headers: {"Content-type": "application/json"}
        }

    const response = await fetch(url,method);
    const result = await response.json();
    return result;
        
    } catch (error) {
    return null;
}
}


/* 
fetch('http://localhost:1337/api/restaurants', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Dolemon Sushi',
    description: 'Unmissable Japanese Sushi restaurant. The cheese and salmon makis are delicious',
    categories: [3],
  }),
})
  .then(response => response.json())
  .then(data => console.log(data)); */