import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IEmployee } from '../models/IEmployee';
import * as rxUtils from '../functions/rx.utils';
import * as empUtils from '../functions/employee-service.utils';
import * as mocks from '../functions/mock.utils';

import { TimeService } from './time.service';
import { IWork } from '../models/IWork';
import { WorkService } from './work.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(
        private timeService: TimeService,
        private workService: WorkService
    )
    {
        this.timeService.onDayPassed(() => {
            this.computeDailyWork();
        });

        this.timeService.onMonthPassed(() => {
            this.computePayouts();
        });
    }

    private employees$ = new BehaviorSubject<IEmployee[]>(mocks.mockCompany().projects.map(x => x.assignedEmployees).flat());
    employees = this.employees$.asObservable();
    addEmployees = (e: IEmployee | IEmployee[]) => rxUtils.add(e, this.employees$);
    editEmployee = (e: IEmployee) => {
        const reducerFn = ((acc: IEmployee[], x: IEmployee) => {
            x.id === e.id ? acc.push(e) : acc.push(x);
            return acc;
        });
        rxUtils.edit(this.employees$, reducerFn);
    }

    removeEmployee = (e: IEmployee) => rxUtils.remove(e, this.employees$, (i, v) => i.id !== v.id);
    

    // salary
    private salaryPayout$ = new Subject<number>();
    salaryPayout = this.salaryPayout$.asObservable();
    private computePayouts() {
        const payout = empUtils.computePayouts(this.employees$.getValue());
        this.salaryPayout$.next(payout);
    }

    // daily work
    private computeDailyWork() {
        const dailyWork = empUtils.computeDailyWork(this.employees$.getValue(), this.timeService.currentDate);
        this.workService.addDailyWork(dailyWork);
    }

    // exp gain
    
}
