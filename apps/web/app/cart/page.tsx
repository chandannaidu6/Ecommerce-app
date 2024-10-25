'use client'
import React from "react";
import { useCart } from "../../contexts/cartContext";
import { useRouter } from 'next/navigation'


const CartPage:React.FC = () => {
    const {cartItems,updateCartItem,removeCartItem} = useCart();
    const router = useRouter()

    const handleQuantityChange = (productId:number,quantity:number) => {
        updateCartItem(productId,quantity)
    }

    const handleRemoveItem = (productId:number) => {
        removeCartItem(productId)
    }

    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-4'>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ): (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className='flex items-center justify-between mb-4 p-4 border rounded'>
                            <img src={item.images[0]?.url || '/placeholder.png'} alt={item.name} className='w-16 h-16 object-cover' />
                            <div className='flex-grow mx-4'>
                                <h2 className='text-lg font-bold'>{item.name}</h2>
                                <p className= 'text-gray-700'>Price:${item.price.toFixed(2)}</p>
                                <div className='flex items-center'>
                                    <label htmlFor='quantity' className="mr-2">Qty:</label>
                                    <input 
                                        type="number"
                                        id="quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id,parseInt(e.target.value))}
                                        className='border px-2 py-1 w-16 text-center'
                                        min="1"
                                        />
                                </div>
                            </div> 
                            <button onClick={() => handleRemoveItem(item.id)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                                Remove
                            </button>
                        </div>   
                    ))}
                    <div className='mt-4'>
                        <button onClick={() => router.push('/checkout')}
                            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'>
                                Proceed to Checkout
                        </button>
                    </div>
                
                </div>    
            )}
        </div>
    )
}
export default CartPage