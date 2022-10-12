import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext([])

export function useCartContext() {return useContext(CartContext)} 

export default function CartContextProvider({ children }) {
    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(priceSum());
    const [totalQuantity, setTotalQuantity] = useState('');

    function addToCart(item){
        // Nested conditional to increase the quantity if the item is already in the cartList and stock hasn't been depleted yet
        if (findDuplicate(item)){
            if (cartList.find( ({id}) => id === item.id).quantity < item.stock){
                cartList.find( ({id}) => id === item.id).quantity += item.quantity;
                setTotalQuantity(quantitySum());
            }
        }else{
            if (item.stock > 0) {
                setCartList([...cartList, item]);
                setTotalQuantity(quantitySum())
            } else{
                alert('Sin stock!')
            }
        }
    }

    function clearCart(){
        setCartList([]);
    }

    //remove 1 item from the cartList
    function removeItem(item){
        setCartList(cartList.filter(({id}) => id !== item.id))
    }

    function findDuplicate(item){
        return cartList.find( ({id}) => id === item.id)
    }

    //Functions to add and subtract from the item's quantity with buttons in the cart view
    function addQuantity(item){
        let quantityToAdd = Number(cartList.find( ({id}) => id === item.id).quantity);
        if (quantityToAdd<item.stock) {
            quantityToAdd += 1
        }
        cartList.find( ({id}) => id === item.id).quantity = quantityToAdd;
    }

    function subtractQuantity(item){
        let quantityToSub = cartList.find( ({id}) => id === item.id).quantity;
        if (quantityToSub>1) {
            quantityToSub = quantityToSub-1
        }
        cartList.find( ({id}) => id === item.id).quantity = quantityToSub;
    }

    function priceSum(){
        let priceSum = 0;
        for (let index = 0; index < cartList.length; index++) {
            priceSum = priceSum + (cartList[index].quantity*cartList[index].price);
        }
        return priceSum
    }

    //Get total quantity sum for the cart widget
    function quantitySum(){
        let quantitySum = 0;
        for (let index = 0; index < cartList.length; index++) {
            quantitySum = quantitySum + Number(cartList[index].quantity);
        }
        return quantitySum
    }

    //useEffect hook to make total price and quantity zero when the cart list is empty
    useEffect(() => {
      if (cartList.length === 0){
        setTotalPrice(0)
        setTotalQuantity(0)
      };
    }, [cartList]);
    

    return <CartContext.Provider value={{ 
        cartList, 
        addToCart, 
        clearCart, 
        removeItem, 
        addQuantity, 
        subtractQuantity, 
        priceSum, 
        totalPrice, 
        setTotalPrice, 
        quantitySum, 
        totalQuantity, 
        setTotalQuantity, 
        findDuplicate
        }}>
        {children}
    </CartContext.Provider>;
}
