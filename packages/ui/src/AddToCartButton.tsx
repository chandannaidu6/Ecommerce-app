'use client'
import { useRouter } from 'next/navigation'
import { Product } from '../../../apps/web/app/lib/types'
import { useCart } from '../../../apps/web/contexts/cartContext'
interface AddToCartButtonProps{
    product:Product
}

const AddToCartButton:React.FC<AddToCartButtonProps> = ({ product }) => {
    const {addToCart} = useCart();
    const router  = useRouter()

    const handleAddToCart = () => {
        addToCart(product)
        router.push('/cart')
    }

    return (
        <button onClick={handleAddToCart} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'>
            Add To Cart
        </button>
    )

}

export default AddToCartButton