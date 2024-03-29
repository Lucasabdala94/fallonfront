import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext([]);

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const carrito = JSON.parse(localStorage.getItem("carritoFallon"));
        setCart(carrito)
    }, [])

    useEffect(() => {

    }, [cart])

    const addProduct = (item, newQuantity) => {
        if (cart !== null) {
            const newCart = cart?.filter(prod => prod.item.id !== item.id);
            newCart.push({ item, quantity: newQuantity });
            setCart(newCart);
            localStorage.setItem("carritoFallon", JSON.stringify(newCart));
        } else {
            let cart = [];
            cart.push({ item, quantity: newQuantity })
            setCart(cart);
            localStorage.setItem("carritoFallon", JSON.stringify(cart));
        }
    }


    const clearCart = () => {
        setCart(null)
        localStorage.removeItem("carritoFallon");
    };

    /* devuelve si esta  o no en el carrito un true o false */
    const isToCart = (id) => {
        if (cart !== null) {
            return cart.find(product => product.item.id === id) ? true : false;
        } else {
            return false
        }
    }
    /* Devuelve si esta el producto en oferta o no */
    const isOffert = (attributes) => {
        return (attributes?.attributes?.oferta === null || attributes?.attributes?.oferta === false) ? false : true
    }

    /*Devuelve la cantidad de un determinado producto en el carro */
    const isToCantidad = (id, producto) => {

        if (cart !== null) {
            let newCart = [];
            cart.filter(product => {
                if (product.item.id === id) {
                    if (parseInt(producto?.stock) >= parseInt(product?.quantity)){
                        return newCart.push(product?.quantity);
                    }else if(parseInt(producto?.stock)=== 0){
                        removeProduct(product.item.id )
                        return null
                    }else{
                        addProduct(product?.item,producto?.stock)
                        return newCart.push(producto?.stock)
                    }
                }
                return null
            });

            if (newCart.length !== 0) {
                return `${newCart[0]}`
            } else {
                return ""
            }
        } else {
            return ""
        }
    }
    /* suma cualquier carro */
    const sumarCarritos=(carrito)=>{
        let total = 0;
        if(carrito !== null){
            carrito.filter( product => total +=parseInt(product.precio) * parseInt(product.cant)
                
            )
            return total
        }
        return total
    }


    /* suma el carrito que se encuentra en el contexto */
    const sumarCarrito = () => {
        let total = 0;
        if (cart !== null) {
            cart?.filter(product => total += parseInt(product.item.precio) * parseInt(product.quantity)
            )
            return total
        }
        return total
    }
    const removeProduct = (id) => {
        const newCart = cart.filter(product => product.item.id !== id)
        if (newCart.length === 0) {
            setCart(null)
            localStorage.removeItem("carritoFallon");
        } else {
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
                    sumarCarritos,
                    clearCart,
                    isToCart,
                    removeProduct,
                    addProduct,
                    isToCantidad,
                    isOffert,
                }}
            >
                {children}
            </cartContext.Provider>
        </>
    )
}