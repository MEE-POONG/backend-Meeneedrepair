import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient();

type Data = {
    success: boolean;
    message?: string;
    data?: any;
    pagination?: Pagination
};

type Pagination = {
    page: number;
    pageSize: number;
    total: number;
}

interface RequestQuery {
    page?: string;
    pageSize?: string;
    keyword?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const query: RequestQuery = req.query as unknown as RequestQuery;

     
                const members = await prisma.member.findFirst({
                    orderBy: { firstname: 'asc' }
                });

      


                res.status(200).json({ success: true, data: members });
            } catch (error) {
                res.status(500).json({ success: false, message: "An error occurred while fetching the members" });
            }
            break;

        case 'POST':
            try {
                const { username, password, firstname, lastname, bankAccount, bank, phone, line, email } = req.body;

                if (!username || !password || !firstname || !lastname || !bankAccount || !bank || !phone || !line) {
                    return res.status(400).json({ success: false, message: "All fields are required" });
                }
                const newMember = await prisma.member.create({
                    data: {
                        username,
                        password,
                        firstname,
                        lastname,
                        bankAccount,
                        bank,
                        phone,
                        line,
                        email,
                    },
                });

                res.status(201).json({ success: true, data: newMember });
            } catch (error) {
                res.status(500).json({ success: true, message: "An error occurred while creating the member" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
