import { IProject } from "./IProject";
import { IWork } from "./IWork";

export interface ICompany {
    projects: IProject[];
    budget: number;
    work: IWork[]
}