'use client'
import React,{ createContext,useContext,useState,useEffect,ReactNode} from 'react'
import { Product } from '../app/lib/types';
import axios from 'axios';

interface CartItem extends Product{
    quantity: number

}

interface CartContextProps{
    cartItems : CartItem[];
    addToCart : (product:Product,quantity:number) => Promise<void>
    updateCartItem : (itemId:number,quantity:number) => Promise<void>
    removeCartItem : (itemId:number) => Promise<void>
    clearCart: () => void


}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider : React.FC<{children: ReactNode}> = ({children}) => {
    const [cartItems,setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        fetchCartItems();
    },[])

    const fetchCartItems = async () => {
        try{
            const response = await axios.get('http://localhost:3002/pages/api/cart')
            setCartItems(response.data.cartItems)
        }catch(error){
            console.error("Failed to load cart items",error)
        }
    }

    const addToCart = async (product:Product,quantity=1) => {
        try{
            const response =await axios.post(' http://localhost:3002/pages/api/cart/item',{params:{productId:product.id,quantity}, })
            setCartItems(response.data.cartItems)
        }catch(error){
            console.error(error)
        }

    }
    const updateCartItem = async (productId : number,quantity : number) => {
        try{
            const response = await axios.put(`http://localhost:3002/pages/api/cart/items/${productId}`,{params:{quantity}, })
            setCartItems(response.data.cartItems)
        }catch(error){
            console.error(error);
        }
    }

    const removeCartItem = async (productId : number):Promise<void> => {
        try{
            await axios.delete(`http://localhost:3002/pages/api/cart/items/${productId}`)
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
        }catch(error){
            console.error(error)
        }
    }

    const clearCart = async () => {
        try{
            await axios.post('http://localhost:3002/pages/api/cart/clear')
            setCartItems([])
        }catch(error){
            console.log(error)
        }
    }



    return (
        <CartContext.Provider value = {{cartItems,addToCart,updateCartItem,removeCartItem,clearCart}}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error('useCart must be used within the Cart Provider');
    return context
}
 