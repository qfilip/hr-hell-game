import { IProject } from "./IProject";

export interface ICompany {
    projects: IProject[];
    budget: number;
}