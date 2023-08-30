import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const minusIncome = await prisma.minusIncome.findUnique({
                    where: { id: id as string },
                });

                if (!minusIncome) {
                    return res.status(404).json({ error: "No agent income system found with this id" });
                }

                res.status(200).json(minusIncome);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income system" });
            }
            break;

        case 'PUT':
            try {
                const updatedMinusIncome = await prisma.minusIncome.update({
                    where: { id: id as string },
                    data: req.body,
                });

                res.status(200).json(updatedMinusIncome);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the agent income system" });
            }
            break;

        case 'DELETE':
            try {
                const deletedMinusIncome = await prisma.minusIncome.delete({
                    where: { id: id as string },
                });

                res.status(200).json(deletedMinusIncome);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
