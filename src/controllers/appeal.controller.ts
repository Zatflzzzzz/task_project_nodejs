// src/controllers/appeal.controller.ts
import {Request, Response} from 'express';
import {AppealHelper} from '../helpers/appeal.helper';
import {CustomError} from '../errors/custom.error';
import {Status} from '@prisma/client';

export class AppealController {
    static async createAppeal(req: Request, res: Response) {
        const { topic, text } = req.body;

        if (!topic || !text) {
            return res.status(400).json({ error: 'Topic and text are required' });
        }

        try {
            const appeal = await AppealHelper.createAppeal(topic, text);
            res.status(201).json(appeal);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to create appeal' });
            }
        }
    }

    static async takeToWork(req: Request, res: Response) {
        const appealId = Number(req.params.id);

        if (isNaN(appealId)) {
            return res.status(400).json({ error: 'Invalid appeal ID' });
        }

        try {
            const updatedAppeal = await AppealHelper.takeAppealToWork(appealId);
            res.json(updatedAppeal);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to take appeal to work' });
            }
        }
    }

    static async complete(req: Request, res: Response) {
        const appealId = Number(req.params.id);
        const { solution } = req.body;

        if (isNaN(appealId)) {
            return res.status(400).json({ error: 'Invalid appeal ID' });
        }

        if (!solution) {
            return res.status(400).json({ error: 'Solution is required' });
        }

        try {
            const completedAppeal = await AppealHelper.completeAppeal(appealId, solution);
            res.json(completedAppeal);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to complete appeal' });
            }
        }
    }

    static async cancel(req: Request, res: Response) {
        const appealId = Number(req.params.id);
        const { cancelReason } = req.body;

        if (isNaN(appealId)) {
            return res.status(400).json({ error: 'Invalid appeal ID' });
        }

        if (!cancelReason) {
            return res.status(400).json({ error: 'Cancel reason is required' });
        }

        try {
            const canceledAppeal = await AppealHelper.cancelAppeal(appealId, cancelReason);
            res.json(canceledAppeal);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to cancel appeal' });
            }
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const { date, startDate, endDate, status } = req.query;

            const appeals = await AppealHelper.getAppeals({
                ...(date && { date: date.toString() }),
                ...(startDate && { startDate: startDate.toString() }),
                ...(endDate && { endDate: endDate.toString() }),
                ...(status && { status: status as Status })
            });

            res.json(appeals);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to get appeals' });
            }
        }
    }

    static async bulkCancelInProgress(_req: Request, res: Response) {
        try {
            const result = await AppealHelper.cancelAllInProgress();
            res.json({ message: `Cancelled ${result.count} in-progress appeals` });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to cancel in-progress appeals' });
            }
        }
    }
}