
import React from "react" 
import { notFound } from 'next/navigation'
import { Product } from "../../lib/types"

async function fetchProduct(id:string):Promise<Product |null>{
    const res = await fetch(`http://localhost:3001/pages/api/products/${id}`,{
        cache:'no-store',
    });
    if(!res.ok) return null;
    return res.json();
}

interface ProductPageProps{
    params:{id:string}
}

export default async function ProductDetailPage({params}:ProductPageProps){
    const product = await fetchProduct(params.id)

    if(!product){
        notFound();
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{product.name}</h1>
        <img src={product.images[0]?.url || '/placeholder.png'}
            alt = {product.name}
            className='w-full h-64 object-cover mb-4'
            />
            <p className="text-xl mb-4">
            <span className="font-bold">PRICE:</span>
            <span className="text-gray-700 ml-2">{product.price.toFixed(2)}</span>
            </p>

        <p>{product.description}</p>    
        </div>

    )
}