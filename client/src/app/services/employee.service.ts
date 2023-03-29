import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as empUtils from '../functions/employee-service.utils';
import { IEmployee } from '../models/IEmployee';

import { TimeService } from './time.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(
        private timeService: TimeService
    )
    {
        this.timeService.onDayPassed(() => {
            this.computePayouts();
            this.computeDailyWork();
        });
    }

    private employees$ = new BehaviorSubject<IEmployee[]>([]);
    private salaryPayout$ = new Subject<number>();
    private dailyWork$ = new Subject<Map<string, number>>();
    
    employees = this.employees$.asObservable();
    salaryPayout = this.salaryPayout$.asObservable();
    dailyWork = this.dailyWork$.asObservable();

    addEmployee(e: IEmployee) {
        const es = [...this.employees$.getValue(), e];
        this.employees$.next(es);
    }

    editEmployee(e: IEmployee) {
        const es = this.employees$.getValue().reduce((acc, x) => {
            x.id === e.id ? acc.push(e) : acc.push(x);
            return acc;
        }, []);
        this.employees$.next(es);
    }

    removeEmployee(e: IEmployee) {
        const es = this.employees$.getValue().filter(x => x.id !== e.id);
        this.employees$.next(es);
    }

    private computePayouts() {
        const payout = empUtils.computePayouts(this.employees$.getValue());
        this.salaryPayout$.next(payout);
    }

    private computeDailyWork() {
        const dailyWork = empUtils.computeDailyWork(this.employees$.getValue());
        this.dailyWork$.next(dailyWork);
    }
}
