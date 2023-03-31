import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { IEmployee } from 'src/app/models/IEmployee';
import { IProject } from 'src/app/models/IProject';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnDestroy {

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) { }

  
  ngOnInit(): void {
    this.projects$ = this.projectService.projects;
    this.employees$ = combineLatest([
      this.employeeService.employees,
      this.projectQuery$,
      this.nameQuery$
    ])
    .pipe(
      map(([emps, projq, nameq]) => {
        if(projq === this.defaultProjectQuery.value)
          return emps.filter(x => x.name.toLowerCase().includes(nameq));
        else
          return emps.filter(x => x.projectId === projq && x.name.toLowerCase().includes(nameq));
      })
    );
  }
  
  ngOnDestroy(): void {
    this.projectQuery$.complete();
    this.nameQuery$.complete();
  }

  defaultProjectQuery = { name: 'All', value: 'all' };
  projectQuery$ = new BehaviorSubject<string>(this.defaultProjectQuery.value);
  nameQuery$ = new BehaviorSubject<string>('');

  projects$: Observable<IProject[]>;
  employees$: Observable<IEmployee[]>;

  onNameFilter(val: string) {
    this.nameQuery$.next(val);
  }

  onProjectFilter(projectId: string) {
    this.projectQuery$.next(projectId);
  }
}
