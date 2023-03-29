import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SimulationService {
    constructor() { }
    
    private simulationRunning = false;
    private timeout: any;
    private dayLength$ = new BehaviorSubject(1000);
    private date$ = new BehaviorSubject(new Date(2000, 0, 1));
    private onDayPassedHandlers: (() => void)[] = [];

    startTimeFlow() {
        if(this.simulationRunning) {
            return;
        }
        this.simulationRunning = true;

        const computeDay = () => {
            this.timeout = setTimeout(() => {
                clearTimeout(this.timeout);
                this.addDay();
                this.onDayPassedHandlers.forEach(fn => fn());
                computeDay();
            }, this.dayLength$.getValue());
        }
    
        computeDay();
    }

    freezeTimeFlow() {
        this.simulationRunning = false;
        clearTimeout(this.timeout);
    }

    setDayLength(len: number) {
        this.dayLength$.next(len);
    }

    dayLength = this.dayLength$.asObservable();

    date = this.date$.asObservable();

    private addDay() {
        const newDate = new Date(this.date$.getValue());
        newDate.setDate(this.date$.getValue().getDate() + 1);
        console.log(this.date$.getValue());
        this.date$.next(newDate);
    }

    addOnDayPassedHandler(handler: () => void) {
        this.onDayPassedHandlers.push(handler);
    }
}
