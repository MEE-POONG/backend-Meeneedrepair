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

                const blog = await prisma.blog.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalblog = await prisma.blog.count();
                const totalPage: number = Math.ceil(totalblog / pageSize);
                res.status(200).json({ blog });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the blog" });
            }
            break;

        case 'POST':
            try {
                const newblog = await prisma.blog.create({
                    data: req.body,
                });

                res.status(201).json(newblog);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the blog" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}