import { IProject } from "../IProject";
import { IWork } from "../IWork";

export interface IProjectDailyWork {
    project: IProject;
    dailyWork: IWork[];
}