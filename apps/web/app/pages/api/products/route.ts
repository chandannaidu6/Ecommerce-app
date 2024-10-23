import { NextResponse } from "next/server";
import db from '@repo/db'

export async function GET(request:Request){
    try{
        const products = await db.product.findMany({
            include:{
                category:true,
                images:true
            }
        })
        return NextResponse.json(products)
    }catch(error){

        return NextResponse.error()

    }
}