import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SimulationService } from 'src/app/services/simulation.service';

@Component({
  selector: 'time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.css']
})
export class TimeControlComponent implements OnInit {

    constructor(private simulationService: SimulationService) {}
    
    ngOnInit(): void {
        this.currentDate$ = this.simulationService.date
            .pipe(map(x => x));

        this.dayLength$ = this.simulationService.dayLength
            .pipe(map(x => x));
    }
    
    currentDate$: Observable<Date>;
    dayLength$: Observable<number>;

    toggleTimeFlow(run: boolean) {
        if(run) {
            this.simulationService.startTimeFlow();
        }
        else {
            this.simulationService.freezeTimeFlow();
        }
    }

    changeDayDuration(e: string) {
        this.simulationService.setDayLength(parseInt(e));
    }

}
