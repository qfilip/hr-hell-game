import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { doDailyWork } from '../functions/work';
import { IEmployee } from '../models/IEmployee';
import { IWorkData } from '../models/IWorkData';
import { CompanyService } from './company.service';
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

    private computePayouts() {
        const payout = this.employees$.getValue()
            .reduce((acc, x) => {
                acc += x.salary;
                return acc;
            }, 0);
        
        this.salaryPayout$.next(payout);
    }

    private computeDailyWork() {
        const initialValue: Map<string, number> = new Map();
        const doDailyWork = (e: IEmployee) => {
            const w = 1;
            let done = w * (e.expertize - e.laziness + e.satisfaction);
            done = done < 0 ? 0 : done;
            return Math.round(done * 100) / 100;
        }

        const dailyWork = this.employees$.getValue()
            .reduce((acc, x) => {
                acc[x.projectId] += doDailyWork(x);
                return acc;
            }, initialValue);

        this.dailyWork$.next(dailyWork);
    }
}
