import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HireComponent } from './components/employee/hire/hire.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsOverviewComponent } from './components/project/projects-overview/projects-overview.component';

const routes: Routes = [
    { component: HomeComponent, path: '' },
    { component: HireComponent, path: 'hire' },
    { component: ProjectsOverviewComponent, path: 'projects-overview' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
