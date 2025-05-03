// appeal.factory.ts
import {AppealResponseDto} from '../dto/appeal.dto';
import {IAppeal} from "../interfaces/appeal.interface";

export class AppealFactory {
    static createResponse(appeal: IAppeal): AppealResponseDto {
        return {
            id: appeal.id,
            topic: appeal.topic,
            text: appeal.text,
            status: appeal.status,
            solution: appeal.solution ?? undefined,
            cancelReason: appeal.cancelReason ?? undefined,
            createdAt: appeal.createdAt,
            updatedAt: appeal.updatedAt,
            takenAt: appeal.takenAt ?? undefined,
            completedAt: appeal.completedAt ?? undefined,
            canceledAt: appeal.canceledAt ?? undefined,
        };
    }
}