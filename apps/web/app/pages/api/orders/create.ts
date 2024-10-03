import { NextApiRequest,NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from '@repo/db';

export default async function createOrder(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        const session = await getSession({req});

        if(!session?.user?.id){
            return res.status(401).json({error:"Unauthorized"})
        }

        const userId = session.user.id;

        try{
            const cart = await db.cart.findUnique({
                where:{userId},
                include:{
                    cartItem:{
                        include:{
                            product:true
                        }
                    }

                }
            })
            if(!cart || cart.cartItem.length === 0){
                return res.status(401).json({error:"Your cart is empty"})
            }

            const totalAmount = cart.cartItem.reduce((total,item) => {
                return total+ item.product.price*item.quantity;
            },0);

            const order = await db.order.create({
               data:{
                    userId,
                    total:totalAmount,
                    orderItems:{
                        create:cart.cartItem.map((item) => ({
                            productId:item.productId,
                            quantity:item.quantity,
                            price:item.product.price
                        }))
                    }


               } ,
               include:{
                orderItems:true
               }

            })

            await db.cartItem.deleteMany({
                where:{
                    cartId:cart.id
                }
            })

            res.status(201).json(order)


        }catch(e){
            console.error("Error creating order",e);
            res.status(500).json({e:"Internal server error"})
        } 


    }else{
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}
