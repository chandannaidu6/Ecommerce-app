import React from "react"
import  Link  from "next/link"
import { Product } from "../lib/types"

async function fetchProducts():Promise<Product[]>{
    const res = await fetch('http://localhost:3001/pages/api/products',{
        cache:"no-store"
    })
    if(!res.ok) throw new Error('Failed to fetch products')
    return res.json();

}

export default async function ProductsPage(){
    const products = await fetchProducts()

    return (
        <div>
            <h1 className = 'text-3xl font-bold mb-6'>Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {products.map((product) => (
                    <div key={product.id} className='border rounded-lg p-4'>
                    <Link href={`/products/${product.id}`}>
                        <img src={product.images[0]?.url || '/placeholder.png'}
                            alt={product.name}
                            className='w-full h-48 object-cover mb-4' />
                        <h2 className='text-xl font-semibold'>{product.name}</h2>
                        <p className='text-gray-700'>{product.description}</p>
                    </Link>
                    
                    </div>     

                ))}
            </div>
        </div>
    )
}