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

                const product = await prisma.product.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalproduct = await prisma.product.count();
                const totalPage: number = Math.ceil(totalproduct / pageSize);
                res.status(200).json({ product });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the product" });
            }
            break;

        case 'POST':
            try {
                const newproduct = await prisma.product.create({
                    data: req.body,
                });

                res.status(201).json(newproduct);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the product" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}