import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const pastBETFLIX = await prisma.pastBETFLIX.findUnique({
                    where: { id: id as string },
                });

                if (!pastBETFLIX) {
                    return res.status(404).json({ error: "No agent income system found with this id" });
                }

                res.status(200).json(pastBETFLIX);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income system" });
            }
            break;

        case 'PUT':
            try {
                const updatedPastBETFLIX = await prisma.pastBETFLIX.update({
                    where: { id: id as string },
                    data: req.body,
                });

                res.status(200).json(updatedPastBETFLIX);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the agent income system" });
            }
            break;

        case 'DELETE':
            try {
                const deletedPastBETFLIX = await prisma.pastBETFLIX.delete({
                    where: { id: id as string },
                });

                res.status(200).json(deletedPastBETFLIX);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
