import { NextApiRequest,NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from '@repo/db'

export default async function getCart(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'GET'){
        const session = await getSession({req})

        if(!session?.user?.id){
            return res.status(401).json({error:"Unauthorized user"})
        }
        const userId = session.user.id;

        try{
            let cart  = await db.cart.findUnique({
                where:{
                    userId,
                },
                include:{
                    cartItem:{
                        include:{
                            product:true
                        }
                    }
                }
            })
            if(!cart){
                cart  =  await db.cart.create({
                    data:{
                        userId,
                    },
                    include:{
                            cartItem:{
                                include:{
                                    product:true
                                }
                            }
                    }
                })
            }
            res.status(200).json(cart)

        }catch(error){
                res.status(500).json({error:"Internal Server Error"})
        }
    }
    else{
        res.status(405).json(`Method ${req.method} not allowed`)
    }
}