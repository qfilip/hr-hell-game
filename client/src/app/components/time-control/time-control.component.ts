import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICompany } from 'src/app/models/ICompany';
import { CompanyService } from 'src/app/services/company.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.css']
})
export class TimeControlComponent implements OnInit {

    constructor(
        private timeService: TimeService,
        private companyService: CompanyService) {}
    
    ngOnInit(): void {
        this.company$ = this.companyService.company
            .pipe(map(x => x));

        this.currentDate$ = this.timeService.date
            .pipe(map(x => x));

        this.dayLength$ = this.timeService.dayLength
            .pipe(map(x => x));
    }
    
    company$: Observable<ICompany>;
    currentDate$: Observable<Date>;
    dayLength$: Observable<number>;
    timeRunning: boolean = false;

    toggleTimeFlow(run: boolean) {
        if(run) {
            this.timeService.startTimeFlow();
        }
        else {
            this.timeService.freezeTimeFlow();
        }

        this.timeRunning = run;
    }

    changeDayDuration(e: string) {
        this.timeService.setDayLength(parseInt(e));
    }

}
