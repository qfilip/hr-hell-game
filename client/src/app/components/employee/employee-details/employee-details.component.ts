import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, combineLatest, map, tap } from 'rxjs';
import { IEmployee } from 'src/app/models/IEmployee';
import { IProject } from 'src/app/models/IProject';
import { IWork } from 'src/app/models/IWork';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { WorkService } from 'src/app/services/work.service';

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
        private projectService: ProjectService,
        private workService: WorkService
    ) { }

    ngOnInit(): void {
        this.projects$ = this.projectService.projects;
        this.activatedRoute.queryParamMap.subscribe(ps => {
            const employeeId = ps.get('employeeId');
            this.employee$ = this.employeeService.employees
                .pipe(
                    map(x => x.filter(e => e.id === employeeId)[0])
                );

            this.work$ = combineLatest([this.workService.work])
                .pipe(
                    tap(([x]) => {
                        const work = x
                            .filter(w => w.employeeId === employeeId)
                            .sort((a, b) => a.date.getTime() - b.date.getTime());

                        this.totalWork = work.reduce((acc, next) => acc + next.points, 0);
                    }),
                    map(([x]) => x)
                );
        });
    }

    employee$: Observable<IEmployee>;
    work$: Observable<IWork[]>;
    projects$: Observable<IProject[]>;

    totalWork: number = 0;
    workOnProject: number = 0;

    
}
