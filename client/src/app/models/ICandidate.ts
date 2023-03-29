import { IEmployee } from "./IEmployee";

export interface ICandidate {
    employee: IEmployee
    daysWithoutJob: number;
    salaryExpectation: number;
}