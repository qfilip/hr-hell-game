import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HireComponent } from './components/hire/hire.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { component: HomeComponent, path: '' },
    { component: HireComponent, path: 'hire' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
