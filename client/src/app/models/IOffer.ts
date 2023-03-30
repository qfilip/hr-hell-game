import { ICandidate } from "./ICandidate";

export interface IOffer {
    candidate: ICandidate;
    offeredSalary: number;
    daysUntilResponse: number;
    daysInQueue: number;
    chanceToAccept: number;
}