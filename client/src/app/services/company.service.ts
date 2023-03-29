import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICompany } from '../models/ICompany';
import { faker } from '@faker-js/faker';
import { EmployeeService } from './employee.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private employeeService: EmployeeService)
    {
        this.employeeService.salaryPayout
        .subscribe({
            next: (x) => {
                const c = this.company$.getValue();
                c.budget -= x;
                this.company$.next(c);
            }
        })
    }

    private company$ = new BehaviorSubject<ICompany>(this.mockCompany());

    company = this.company$.asObservable();
    
    private mockCompany() {
        const c: ICompany = {
            budget: 100000,
            projects: [
                {
                    id: faker.git.shortSha(),
                    name: faker.company.bsBuzz(),
                    assignedEmployees: [],
                    completedWork: 0,
                    totalWork: 1000,
                    successPayout: 0
                }
            ]
        };

        return c;
    }
}
