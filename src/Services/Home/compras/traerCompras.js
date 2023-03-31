import { URL } from "../../../contants";

export default async function traercompras(username){
    try {
        const url=`${URL}/compras?filters[IdUser][$eqi]=${username}&sort=createdAt:DESC`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        return null;
    }
}