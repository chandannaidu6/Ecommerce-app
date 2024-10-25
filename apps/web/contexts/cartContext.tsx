'use client'
import React,{ createContext,useContext,useState,useEffect,ReactNode} from 'react'
import { Product } from '../app/lib/types';

interface CartItem extends Product{
    quantity: number

}

interface CartContextProps{
    cartItems : CartItem[];
    addToCart : (product:Product) => Promise<void>
    updateCartItem : (itemId:number,quantity:number) => Promise<void>
    removeCartItem : (itemId:number) => Promise<void>


}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider : React.FC<{children: ReactNode}> = ({children}) => {
    const [cartItems,setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(storedCart)
    },[])

    const saveCart = (items:CartItem[]) => {
        localStorage.setItem('cart',JSON.stringify(items));
        setCartItems(items)
    }

    const addToCart = async (product:Product):Promise<void> => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
          saveCart(
            cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          );
        } else {
          saveCart([...cartItems, {...product,quantity:1}]);
        }

    }
    const updateCartItem = async (productId : number,quantity : number):Promise<void> => {
        saveCart(
            cartItems.map((item) => item.id === productId ? {...item,quantity:Math.max(1,quantity)} : item)
        )
    }

    const removeCartItem = async (productId : number):Promise<void> => {
        saveCart(cartItems.filter((item) => item.id !== productId))
    }



    return (
        <CartContext.Provider value = {{cartItems,addToCart,updateCartItem,removeCartItem}}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error('useCart must be used within the Cart Provider');
    return context
}
 