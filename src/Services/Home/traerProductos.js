import { URL,CANTPRODUCTPAGE } from "../../contants"

export default async function traerProductos(page,search=null){

    const searches = `&filters[$and][0][nombre][$contains]=${search}`

    try {
        /* url sin busqueda */
        const url=`${URL}/products?populate=*&pagination[pageSize]=${CANTPRODUCTPAGE}&pagination[page]=${page}&sort=nombre:ASC`;
        /* url con busqueda */
        const urlSearch=`${URL}/products?populate=*&pagination[pageSize]=${CANTPRODUCTPAGE}&pagination[page]=${page}&sort=nombre:ASC${searches}`
        if(search !== null){
            const response = await fetch(urlSearch);
            const result = await response.json();
            return result;
        }else{
            const response = await fetch(url);
            const result = await response.json();
            return result;
        }   
    } catch (error) {
        return null;
    }
}