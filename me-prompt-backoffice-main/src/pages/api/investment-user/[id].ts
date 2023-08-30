import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const investmentUser = await prisma.investmentUser.findUnique({
                    where: { id: id as string },
                });

                if (!investmentUser) {
                    return res.status(404).json({ error: "No agent income system found with this id" });
                }

                res.status(200).json(investmentUser);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income system" });
            }
            break;

        case 'PUT':
            try {
                const updatedInvestmentUser = await prisma.investmentUser.update({
                    where: { id: id as string },
                    data: req.body,
                });

                res.status(200).json(updatedInvestmentUser);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the agent income system" });
            }
            break;

        case 'DELETE':
            try {
                const deletedInvestmentUser = await prisma.investmentUser.delete({
                    where: { id: id as string },
                });

                res.status(200).json(deletedInvestmentUser);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
