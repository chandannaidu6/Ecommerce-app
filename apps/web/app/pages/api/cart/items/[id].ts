import { NextApiRequest,NextApiResponse} from "next"
import { getSession } from "next-auth/react"
import db from '@repo/db'

export default async function handleCartItem(req:NextApiRequest,res:NextApiResponse){
    const {id} = req.query;

    const session = await getSession({req});
    if(!session?.user?.id){
        return res.status(401).json({error:"Unauthorized"})
    }
    const userId = session.user.id;

    if(req.method === 'PUT'){
        const {quantity} = req.body;

        if(!quantity || quantity<0){
            return res.status(400).json({error:'Invalid quantity '})
        }
        try{
            const cartItem = await db.cartItem.findUnique({
                where:{
                    id:Number(id),

                },
                include:{
                    cart:true
                }
            })

            if(!cartItem || cartItem.cart.userId !== userId){
                return res.status(404).json({error:"User Item cannot be found"})
            }
            const updatedCartItem = await db.cartItem.update({
                where:{id:Number(id)},
                data:{quantity}
            });
            res.status(200).json(updatedCartItem)
        }catch(error){
            res.status(500).json({error:"Internal Serever Error"})
        }
    }else if(req.method === "DELETE"){
        try{
            const cartItem = await db.cartItem.findUnique({
                where:{
                    id:Number(id)
                },
                include:{
                    cart:true
                }
                
            })

            if(!cartItem || cartItem.cart.userId !== userId){
                return res.status(404).json({error:"CartItem not found"})

            }

            await db.cartItem.delete({
                where:{id:Number(id)}
            })

            res.status(204).end()
        }catch(error){
            res.status(500).json({error:"Internal server error"})
        }
    }else{
        res.status(405).json(`Method ${req.method} not allowed`)
    }

}