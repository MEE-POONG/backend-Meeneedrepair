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

                const pastAGs = await prisma.pastAG.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalPastAGs = await prisma.pastAG.count();
                const totalPage: number = Math.ceil(totalPastAGs / pageSize);
                res.status(200).json({ data: pastAGs, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income systems" });
            }
            break;

        case 'POST':
            try {
                const newPastAG = await prisma.pastAG.create({
                    data: req.body,
                });

                res.status(201).json(newPastAG);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
