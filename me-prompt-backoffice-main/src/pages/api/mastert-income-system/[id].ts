import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const mastertIncomeSystem = await prisma.mastertIncomeSystem.findUnique({
                    where: { id: id as string },
                });

                if (!mastertIncomeSystem) {
                    return res.status(404).json({ error: "No agent income system found with this id" });
                }

                res.status(200).json(mastertIncomeSystem);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income system" });
            }
            break;

        case 'PUT':
            try {
                const updatedMastertIncomeSystem = await prisma.mastertIncomeSystem.update({
                    where: { id: id as string },
                    data: req.body,
                });

                res.status(200).json(updatedMastertIncomeSystem);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the agent income system" });
            }
            break;

        case 'DELETE':
            try {
                const deletedMastertIncomeSystem = await prisma.mastertIncomeSystem.delete({
                    where: { id: id as string },
                });

                res.status(200).json(deletedMastertIncomeSystem);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
