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

                const mastertIncomeSystems = await prisma.mastertIncomeSystem.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalMastertIncomeSystems = await prisma.mastertIncomeSystem.count();
                const totalPage: number = Math.ceil(totalMastertIncomeSystems / pageSize);
                res.status(200).json({ data: mastertIncomeSystems, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income systems" });
            }
            break;

        case 'POST':
            try {
                const newMastertIncomeSystem = await prisma.mastertIncomeSystem.create({
                    data: req.body,
                });

                res.status(201).json(newMastertIncomeSystem);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
