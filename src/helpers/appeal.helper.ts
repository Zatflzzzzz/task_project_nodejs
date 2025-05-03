import {PrismaClient, Status} from '@prisma/client';
import {CustomError} from '../errors/custom.error';

const prisma = new PrismaClient();

type FinalStatus = 'Completed' | 'Canceled';

export class AppealHelper {
    private static isFinalStatus(status: Status): status is FinalStatus {
        return status === 'Completed' || status === 'Canceled';
    }

    static async createAppeal(topic: string, text: string) {
        return prisma.appeal.create({
            data: {topic, text},
        });
    }

    static async takeAppealToWork(id: number) {
        const appeal = await prisma.appeal.findUnique({ where: { id } });

        if (!appeal) throw new CustomError('Appeal not found', 404);
        if (appeal.status !== 'New') throw new CustomError('Appeal is not in New status', 400);

        return prisma.appeal.update({
            where: { id },
            data: {
                status: 'InProgress',
                takenAt: new Date(),
            },
        });
    }

    static async completeAppeal(id: number, solution: string) {
        const appeal = await prisma.appeal.findUnique({ where: { id } });

        if (!appeal) throw new CustomError('Appeal not found', 404);
        if (appeal.status !== 'InProgress') throw new CustomError('Appeal is not in progress', 400);

        return prisma.appeal.update({
            where: {id},
            data: {
                status: 'Completed',
                solution,
                completedAt: new Date(),
            },
        });
    }

    static async cancelAppeal(id: number, cancelReason: string) {
        const appeal = await prisma.appeal.findUnique({ where: { id } });

        if (!appeal) throw new CustomError('Appeal not found', 404);
        if (this.isFinalStatus(appeal.status)) {
            throw new CustomError('Cannot cancel already completed or canceled appeal', 400);
        }

        return prisma.appeal.update({
            where: { id },
            data: {
                status: 'Canceled',
                cancelReason,
                canceledAt: new Date(),
            },
        });
    }

    static async getAppeals(filters: {
        date?: string;
        startDate?: string;
        endDate?: string;
        status?: Status;
    }) {
        const where: any = {};

        if (filters.date) {
            const dateObj = new Date(filters.date);
            const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
            const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));

            where.createdAt = { gte: startOfDay, lte: endOfDay };
        }

        if (filters.startDate && filters.endDate) {
            where.createdAt = {
                gte: new Date(filters.startDate),
                lte: new Date(filters.endDate),
            };
        }

        if (filters.status) where.status = filters.status;

        return prisma.appeal.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    static async cancelAllInProgress() {
        return prisma.appeal.updateMany({
            where: { status: 'InProgress' },
            data: {
                status: 'Canceled',
                cancelReason: 'Bulk cancellation',
                canceledAt: new Date(),
            },
        });
    }
}