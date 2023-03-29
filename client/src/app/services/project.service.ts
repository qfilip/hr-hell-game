import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEmployee } from '../models/IEmployee';
import { IProject } from '../models/IProject';
import { EmployeeService } from './employee.service';
import * as projUtils from '../functions/project-service.utils';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private employeeService: EmployeeService)
    {
        this.employeeService.dailyWork
        .subscribe({
            next: (x) => this.updateProjectsWork(x)
        });

        this.employeeService.employees
        .subscribe({
            next: (x) => this.updateProjectsEmployees(x)
        })
    }

    private projects$ = new BehaviorSubject<IProject[]>([]);
    private proposals$ = new BehaviorSubject<IProject[]>(projUtils.generateProposals(10));
    
    projects = this.projects$.asObservable();
    addProject = (p: IProject) => this.addItem(p, this.projects$);
    removeProject = (p: IProject) => this.removeItem(p, this.projects$);
    
    proposals = this.proposals$.asObservable();
    addProposal = (p: IProject) => this.addItem(p, this.proposals$);
    removeProposal = (p: IProject) => this.removeItem(p, this.proposals$);

    
    private addItem(x: IProject, bs$: BehaviorSubject<IProject[]>) {
        const xs = [...bs$.getValue(), x];
        this.projects$.next(xs);
    }

    private removeItem(x: IProject, bs$: BehaviorSubject<IProject[]>) {
        const xs = bs$.getValue().filter(v => v.id !== x.id);
        bs$.next(xs);
    }

    private updateProjectsWork(x: Map<string, number>) {
        const projects = projUtils.updateProjectsWork(x, this.projects$.getValue());
        this.projects$.next(projects);
    }

    private updateProjectsEmployees(es: IEmployee[]) {
        const projects = projUtils.updateProjectsEmployees(es, this.projects$.getValue());
        this.projects$.next(projects);
    }
}
