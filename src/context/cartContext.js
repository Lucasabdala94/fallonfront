import React, { createContext, useEffect, useState} from "react";

export const cartContext = createContext([]);

export function CartProvider({ children }) {
    
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const carrito= JSON.parse(localStorage.getItem("carritoFallon"));
        setCart(carrito)
    },[])

    useEffect(()=>{

    },[cart])

    const addProduct = (item,newQuantity)=>{
        if(cart !== null){
            const newCart = cart?.filter(prod=>prod.item.id!==item.id);
            newCart.push({item,quantity:newQuantity});
            setCart(newCart);
            localStorage.setItem("carritoFallon", JSON.stringify(newCart));
        }else{
            let cart=[];
            cart.push({item,quantity:newQuantity})
            setCart(cart);
            localStorage.setItem("carritoFallon", JSON.stringify(cart));
        }
        

    }


    const clearCart = () =>{
        setCart(null)
        localStorage.removeItem("carritoFallon");
    };

    /* devuelve si esta  o no en el carrito un true o false */
    const isToCart = (id) => {
        if(cart!==null){
            return cart.find(product => product.item.id === id) ? true : false;
        }else{
            return false
        }
    }

    /*Devuelve la cantidad de un determinado producto en el carro */
    const isToCantidad=(id)=>{
        if(cart!==null){
            let newCart=[];
            cart.filter(product => {
                if(product.item.id === id){
                    return newCart.push(product);
                }
                return null               
            });

            if(newCart.length!==0){
                return `${newCart[0]?.quantity}`
            }else{
                return ""
            }
        }else{
            return ""
        }
    }

    const sumarCarrito= ()=>{
        let total =0;
        if(cart!==null){
            cart?.filter( product=> total += parseInt(product.item.precio)*parseInt(product.quantity)
            )
            return total
        }
        return total
    }
    const removeProduct = (id) =>{ 
        const newCart=cart.filter(product => product.item.id !== id)
        if(newCart.length===0){
            setCart(null)
            localStorage.removeItem("carritoFallon");
        }else{
            localStorage.setItem("carritoFallon", JSON.stringify(newCart));
            setCart(newCart)
        }
        
    };
    return (
        <>
            <cartContext.Provider
                value={{
                    cart,
                    sumarCarrito,
                    clearCart,
                    isToCart,
                    removeProduct,
                    addProduct,
                    isToCantidad,
                }}
            >
                {children}
            </cartContext.Provider>
        </>
    )
}