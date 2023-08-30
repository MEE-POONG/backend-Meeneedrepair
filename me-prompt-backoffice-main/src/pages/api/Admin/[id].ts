import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const id = req.query.id;

                const data = await prisma.admin.findUnique({
                    where: {
                        id: id as string,
                    },
                });

                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the data" });
            }
            break;

        case 'PUT':
            try {
                const id = req.query.id;

                const data = await prisma.admin.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });

                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the data" });
            }
            break;

        case 'DELETE':
            try {
                const id = req.query.id;

                const data = await prisma.admin.delete({
                    where: {
                        id: id as string,
                    },
                });

                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the data" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
