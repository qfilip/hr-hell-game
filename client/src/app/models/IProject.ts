import { IEmployee } from "./IEmployee";

export interface IProject {
    id: string;
    name: string;
    assignedEmployees: IEmployee[];
    totalWork: number;
    completedWork: number;
    successPayout: number;
}