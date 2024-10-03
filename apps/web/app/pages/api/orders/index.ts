import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from '@repo/db';

export default async function getOrders(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

        const userId = session.user.id;
        try{
            const orders = await db.order.findMany({
                where:{userId},
                include:{
                    orderItems:{
                        include:{
                            product: true
                        }
                    }
                },
                orderBy:{
                    createdAt:"desc"
                }

            })
            res.status(200).json(orders)
        }
        catch(error){
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
    else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}