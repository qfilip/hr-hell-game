import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HireComponent } from './components/employee/hire/hire.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsOverviewComponent } from './components/project/projects-overview/projects-overview.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';

const routes: Routes = [
    { component: HomeComponent, path: '' },
    { component: HireComponent, path: 'hire' },
    { component: ProjectsOverviewComponent, path: 'projects-overview' },
    { component: ProjectDetailsComponent, path: 'project-details' },
    { component: EmployeesListComponent, path: 'employees-list' },
    { component: EmployeeDetailsComponent, path: 'employee-details' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
