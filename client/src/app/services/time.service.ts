import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimeService {
    constructor() { }
    
    private timeRunning = false;
    private timeout: any;
    private dayLength$ = new BehaviorSubject(1000);
    private date$ = new BehaviorSubject(new Date(2000, 0, 1));
    private onDayPassedHandlers: (() => void)[] = [];
    private onMonthPassedHandlers: (() => void)[] = [];

    startTimeFlow() {
        if(this.timeRunning) {
            return;
        }
        this.timeRunning = true;

        const computeDay = () => {
            this.timeout = setTimeout(() => {
                clearTimeout(this.timeout);
                this.addDay();
                
                this.onDayPassedHandlers.forEach(fn => fn());
                
                if(this.date$.getValue().getDate() === 1) {
                    this.onMonthPassedHandlers.forEach(fn => fn());
                }
                
                computeDay();
            }, this.dayLength$.getValue());
        }
    
        computeDay();
    }

    freezeTimeFlow() {
        this.timeRunning = false;
        clearTimeout(this.timeout);
    }

    setDayLength(len: number) {
        this.dayLength$.next(len);
    }

    dayLength = this.dayLength$.asObservable();

    date = this.date$.asObservable();
    currentDate = this.date$.getValue();

    private addDay() {
        const newDate = new Date(this.date$.getValue());
        newDate.setDate(this.date$.getValue().getDate() + 1);
        this.date$.next(newDate);
    }

    onDayPassed(handler: () => void) {
        this.onDayPassedHandlers.push(handler);
    }

    onMonthPassed(handler: () => void) {
        this.onMonthPassedHandlers.push(handler);
    }
}
