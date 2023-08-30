import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query; // assuming id is passed as a query param
    try {
        switch (method) {

            case 'GET':

                const userAG = await prisma.userAG.findUnique({
                    where: { id: String(id) },
                });
                res.status(200).json(userAG);

                break;
            case 'PUT':
                const { username, originAG, position, percent, commission, overdue, adjustPercentage, pay, customerCommission, recommender } = req.body;
                const numericPercent = Number(percent); // Convert percent to number
                if (isNaN(numericPercent)) {
                    res.status(400).json({ success: false, message: "Invalid percent value" });
                    return; // Exit the function to prevent further execution
                }
                const updatedPartner = await prisma.userAG.update({
                    where: { id: String(id) },
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
                res.status(200).json(updatedPartner);

                break;
            case 'DELETE':
                const deletedPartner = await prisma.userAG.delete({
                    where: { id: String(id) },
                });
                res.status(200).json(deletedPartner);

                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }

    } catch (error) {
        console.error("An unexpected error occurred:", error); // Log the actual error
        res.status(500).json({ success: false, message: "An unexpected error occurred" });
    }
}
