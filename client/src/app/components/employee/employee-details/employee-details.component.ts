import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IEmployee } from 'src/app/models/IEmployee';
import { IProject } from 'src/app/models/IProject';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
    @Input('employee') employee: IEmployee;

    constructor(
        private activatedRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private projectService: ProjectService
    ) { }

    ngOnInit(): void {
        this.projects$ = this.projectService.projects;
        this.activatedRoute.queryParamMap.subscribe(ps => {
            const employeeId = ps.get('employeeId');
            this.employee$ = this.employeeService.employees
                .pipe(
                    map(x => x.filter(e => e.id === employeeId)[0]),
                );
        });
    }

    employee$: Observable<IEmployee>;
    projects$: Observable<IProject[]>;
}
