import { NextResponse } from 'next/server'
import db from '@repo/db'

export async function GET(request:Request,{params}:{params:{id:string}}){
    try{
        const product = await db.product.findUnique({
            where:{
                id:parseInt(params.id,10)
            },
            include:{
                category:true,
                images:true
            }
        })
        if(!product){
            return NextResponse.json({message:'Product not found'},{status:404})
        }

        return NextResponse.json(product)

    }catch(error){
        return NextResponse.error()
    }
}