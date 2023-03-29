import { SafeResourceUrl } from "@angular/platform-browser";

export interface IEmployee {
    id: string;
    projectId: string;
    name: string;
    salary: number;
    laziness: number;
    expertize: number;
    satisfaction: number;
    
    picture: SafeResourceUrl;
}