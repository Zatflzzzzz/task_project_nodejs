// appeal.dto.ts
import {Status} from '@prisma/client';

export class AppealResponseDto {
    id!: number;
    topic!: string;
    text!: string;
    status!: Status;
    solution?: string | null;
    cancelReason?: string | null;
    createdAt!: Date;
    updatedAt!: Date;
    takenAt?: Date | null;
    completedAt?: Date | null;
    canceledAt?: Date | null;
}