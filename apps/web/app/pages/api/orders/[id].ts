import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from "@repo/db"
export default async function getOrderById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;
    try {
      const order = await db.order.findUnique({
        where: { id: Number(id) },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order || order.userId !== userId) {
        return res.status(404).json({ error: 'Order not found.' });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}