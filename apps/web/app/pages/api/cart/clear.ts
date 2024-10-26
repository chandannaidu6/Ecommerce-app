import { NextApiRequest, NextApiResponse} from 'next'
import { getSession } from 'next-auth/react'
import db from '@repo/db'

export default async function clearCart(req:NextApiRequest,res:NextApiResponse){
    const session = await getSession({req})

    if(!session?.user?.id){
        return res.status(401).json({error:"Unauthorised"})
    }

    if(req.method === 'POST'){
        try{
            const userId = session.user.id
            const cart = await db.cart.findUnique({
                where:{userId}
            })
            if(cart){
                await db.cartItem.deleteMany({
                    where:{cartId:cart.id}
                })
            }
            res.status(204).end()

        }catch(error){
            console.log(error)
        }
    }else{
        res.status(405).json({message:"Method not allowed"})
    }
}