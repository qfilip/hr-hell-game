import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HireComponent } from './components/hire/hire.component';
import { TimeControlComponent } from './components/time-control/time-control.component';

@NgModule({
  declarations: [
    AppComponent,
    HireComponent,
    TimeControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
