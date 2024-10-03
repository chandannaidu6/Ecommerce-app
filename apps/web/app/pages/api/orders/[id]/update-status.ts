import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from '@repo/db';

export default async function updateOrderStatus(req:NextApiRequest,res:NextApiResponse){
    const { id } = req.query;

    if(req.method === 'PUT'){
        const {status} = req.body;

        const session = await getSession({req});
        if (!session?.user?.id ) {
            return res.status(401).json({ error: 'Unauthorized' });
          }
      
          try {
      
            const order = await db.order.update({
              where: { id: Number(id) },
              data: { status },
            });
      
            res.status(200).json(order);
          } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ error: 'Internal server error.' });
          }
        } else {
          res.status(405).end(`Method ${req.method} Not Allowed`);
        }
}