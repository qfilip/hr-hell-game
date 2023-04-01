import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, map, takeUntil, tap } from 'rxjs';
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
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private projectService: ProjectService,
        private workService: WorkService
    ) { }

    unsub = new Subject();

    ngOnInit(): void {
        this.activatedRoute.queryParamMap.subscribe(ps => {
            const employeeId = ps.get('employeeId');
            this.employeeService.employees
                .pipe(
                    takeUntil(this.unsub),
                    map(xs => xs.find(x => x.id === employeeId))
                )
                .subscribe({
                    next: (x) => {
                        this.employee = x;
                        this.addSubscriptions(x);
                    }
                });
        });
    }

    ngOnDestroy(): void {
        this.unsub.next(null);
        this.unsub.complete();
    }

    private addSubscriptions(employee: IEmployee) {
        combineLatest([
            this.workService.work,
            this.projectService.projects
        ])
        .pipe(
            takeUntil(this.unsub),
            map(([ws, ps]) => ({ws: ws, ps: ps})))
        .subscribe({
            next: (r) => {
                const employeeWork = r.ws
                    .filter(w => w.employeeId === employee.id)
                    .sort((a, b) => a.date.getTime() - b.date.getTime());

                this.totalWork = employeeWork.reduce((acc, next) => acc + next.points, 0);
            }
        });

        combineLatest([
            this.workService.work,
            this.selectedProjectId$
        ]).pipe(
            takeUntil(this.unsub),
            map(([ws, pid]) => ({ws: ws, pid: pid})))
        .subscribe({
            next: (r) => {
                const employeeWork = r.ws
                    .filter(w => w.employeeId === employee.id)
                    .sort((a, b) => a.date.getTime() - b.date.getTime());

                this.projectWork = employeeWork
                    .filter(x => x.projectId === r.pid)
                    .reduce((acc, next) => acc + next.points, 0);
            }
        });

        this.projectService.projects.subscribe({
            next: (r) => this.projects = r
        }).unsubscribe();
    }

    onProjectStatsChange(projectId: string) {
        this.selectedProjectId$.next(projectId);
    }

    editEmployee(projectId: string, salaryStr: string) {
        const salary = parseInt(salaryStr);
        const updated: IEmployee = {
            ...this.employee,
            projectId: projectId,
            salary: salary
        }
        
        this.employeeService.editEmployee(updated);
    }

    employee: IEmployee;
    projects: IProject[];
    selectedProjectId$ = new BehaviorSubject<string>('');

    totalWork: number = 0;
    projectWork: number = 0;
}
