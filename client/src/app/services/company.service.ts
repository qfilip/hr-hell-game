import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICompany } from '../models/ICompany';
import { EmployeeService } from './employee.service';
import { ProjectService } from './project.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(
        private employeeService: EmployeeService,
        private projectService: ProjectService
    )
    {
        this.employeeService.salaryPayout
        .subscribe({
            next: (x) => {
                const c = this.company$.getValue();
                c.budget -= x;
                this.company$.next(c);
            }
        });

        this.projectService.projects
        .subscribe({
            next: (xs) => {
                const company = {
                    ...this.company$.getValue(),
                    projects: xs
                }

                this.company$.next(company);
            }
        })
    }

    private company$ = new BehaviorSubject<ICompany>({
        budget: 100000,
        projects: []
    } as ICompany);

    company = this.company$.asObservable();
}
