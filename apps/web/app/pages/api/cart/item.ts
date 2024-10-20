import { NextApiRequest,NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "@repo/db";

export default async function addToCart(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        const session = await getSession({req})

        if(!session?.user?.id){
            return res.status(401).json({error:"Unauthorized"})
        }
        const userId = session?.user?.id;
        const {productId,quantity} = req.body;

        if(!quantity || !productId || quantity<0){
            return res.status(400).json({error:"Invalid ProductId or quantity"})
        }

        try{
            const product = await db.product.findUnique({
                where:{
                    id:productId
                }
            })
            if(!product){
                return res.status(404).json({error:"Product not found. "});
            }
            let cart = await db.cart.findUnique({
                where:{
                    userId
                }
            })

            if(!cart){
                cart = await db.cart.create({
                    data:{userId}
                })
            }

            const existingCartItem = await db.cartItem.findUnique({
                where:{
                    cartId_productId:{
                        cartId:cart.id,
                        productId:Number(productId)

                    }


                }
            })

            if(existingCartItem){
                const updatedCartItem = await db.cartItem.update({
                    where:{id:existingCartItem.id},
                    data:{
                        quantity:existingCartItem.quantity+quantity
                    }
                });
                res.status(200).json(updatedCartItem)
            }else{
                const newCartItem = await db.cartItem.create({
                    data:{
                            cartId:cart.id,
                            productId:Number(productId),
                            quantity
                        
                    }
                })
                res.status(201).json(newCartItem)

            }
        }
        catch(error){
            console.error(error);
            res.status(500).json({error:"Internal server error"})
        }
        
    }else{
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}