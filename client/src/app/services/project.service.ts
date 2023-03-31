import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEmployee } from '../models/IEmployee';
import { IProject } from '../models/IProject';
import { EmployeeService } from './employee.service';
import * as projUtils from '../functions/project-service.utils';
import * as rxUtils from '../functions/rx.utils';
import * as mocks from '../functions/mock.utils';
import { IWork } from '../models/IWork';
import { WorkService } from './work.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private workService: WorkService,
        private employeeService: EmployeeService)
    {
        this.workService.dailyWork
        .subscribe({
            next: (x) => this.updateProjectsWork(x)
        });

        this.employeeService.employees
        .subscribe({
            next: (x) => this.updateProjectsEmployees(x)
        })
    }

    private projects$ = new BehaviorSubject<IProject[]>(mocks.mockCompany().projects);
    private proposals$ = new BehaviorSubject<IProject[]>(projUtils.generateProposals(10));
    
    projects = this.projects$.asObservable();
    addProjects = (p: IProject | IProject[]) => rxUtils.add(p, this.projects$);
    removeProject = (p: IProject) => rxUtils.remove(p, this.projects$, (i, v) => i.id !== v.id);
    
    proposals = this.proposals$.asObservable();
    addProposal = (p: IProject | IProject[]) => rxUtils.add(p, this.proposals$);
    removeProposal = (p: IProject) => rxUtils.remove(p, this.proposals$, (i, v) => i.id !== v.id);


    private updateProjectsWork(x: IWork[]) {
        const dailyWorkResults = projUtils.updateProjectsWork(x, this.projects$.getValue());
        this.workService.addWork(dailyWorkResults.map(x => x.dailyWork).flat())
        this.projects$.next(dailyWorkResults.map(x => x.project));
    }

    private updateProjectsEmployees(es: IEmployee[]) {
        const projects = projUtils.updateProjectsEmployees(es, this.projects$.getValue());
        this.projects$.next(projects);
    }
}
