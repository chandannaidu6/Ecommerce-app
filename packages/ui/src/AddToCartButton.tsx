'use client'
import { useRouter } from 'next/navigation'
import { Product } from '../../../apps/web/app/lib/types'

interface AddToCartButtonProps{
    product:Product
}

const AddToCartButton:React.FC<AddToCartButtonProps> = ({ product }) => {
    const router = useRouter()

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingItem = existingCart.find((item: Product & {quantity:number}) => item.id === product.id)

        let updatedCart;
        if(existingItem){
            updatedCart = existingCart.map((item:Product & {quantity:number})=> item.id === product.id ? {...item,quantity:item.quantity+1}:item)
        }else{
            updatedCart = [...existingCart,{...product,quantity:1}]
        }

        localStorage.setItem('cart',JSON.stringify(updatedCart))

        router.push('/cart')

    };

    return (
        <button 
            onClick = {handleAddToCart}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transistion-colors'>
                Add to Cart
            </button>
    )
}

export default AddToCartButton