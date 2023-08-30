import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

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
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;
    try {
        switch (method) {
            case 'GET':
                const query: RequestQuery = req.query as unknown as RequestQuery;
                const page: number = parseInt(query.page || '1', 10);
                const pageSize: number = parseInt(query.pageSize || '10', 10);
                const userAGs = await prisma.userAG.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    include: {
                        member: true,
                    },
                });
                const totalUserAGsCount: number = await prisma.userAG.count();
                const totalPages: number = Math.ceil(totalUserAGsCount / pageSize);

                res.status(200).json({ success: true, data: userAGs, pagination: { total: totalPages, page: page, pageSize: pageSize } });
                break;
            case 'POST':
                const { username, originAG, position, percent, commission, overdue, adjustPercentage, pay, customerCommission, recommender } = req.body;
                const existingUserAG = await prisma.userAG.findFirst({
                    where: {
                        username: username
                    }
                });
                if (existingUserAG) {
                    res.status(203).json({ success: false, message: "Username already exists" });
                    return; // Exit the function to prevent further execution
                }
                const numericPercent = Number(percent); // Convert percent to number
                if (isNaN(numericPercent)) {
                    res.status(400).json({ success: false, message: "Invalid percent value" });
                    return; // Exit the function to prevent further execution
                }
                const newUserAG = await prisma.userAG.create({
                    data: {
                        username,
                        originAG,
                        position,
                        percent: numericPercent, // Use the numeric value
                        commission,
                        overdue,
                        adjustPercentage,
                        pay,
                        customerCommission,
                        recommender
                    },
                });
                res.status(200).json({ success: true, data: newUserAG });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error("An unexpected error occurred:", error); // Log the actual error
        res.status(500).json({ success: false, message: "An unexpected error occurred" });
    }

}
