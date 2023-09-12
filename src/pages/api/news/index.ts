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

                const news = await prisma.news.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalnews = await prisma.news.count();
                const totalPage: number = Math.ceil(totalnews / pageSize);
                res.status(200).json({ news });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the news" });
            }
            break;

        case 'POST':
            try {
                const newnews = await prisma.news.create({
                    data: req.body,
                });

                res.status(201).json(newnews);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the news" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}