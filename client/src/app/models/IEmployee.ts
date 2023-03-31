import { SafeResourceUrl } from "@angular/platform-browser";
import { IWork } from "./IWork";

export interface IEmployee {
    id: string;
    projectId: string;
    name: string;
    salary: number;
    laziness: number;
    expertize: number;
    satisfaction: number;
    work: IWork[];
    picture: SafeResourceUrl;
}