import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HireComponent } from './components/employee/hire/hire.component';
import { TimeControlComponent } from './components/time-control/time-control.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsOverviewComponent } from './components/project/projects-overview/projects-overview.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { CandidatesComponent } from './components/employee/candidates/candidates.component';
import { OffersComponent } from './components/employee/offers/offers.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HireComponent,
    TimeControlComponent,
    HomeComponent,
    ProjectsOverviewComponent,
    DialogComponent,
    CandidatesComponent,
    OffersComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
