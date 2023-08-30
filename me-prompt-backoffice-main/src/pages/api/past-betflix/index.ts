import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const pastBETFLIXs = await prisma.pastBETFLIX.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalPastBETFLIXs = await prisma.pastBETFLIX.count();
                const totalPage: number = Math.ceil(totalPastBETFLIXs / pageSize);
                res.status(200).json({ data: pastBETFLIXs, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income systems" });
            }
            break;

        case 'POST':
            try {
                const newPastBETFLIX = await prisma.pastBETFLIX.create({
                    data: req.body,
                });

                res.status(201).json(newPastBETFLIX);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
