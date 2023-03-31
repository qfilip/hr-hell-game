import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IWork } from '../models/IWork';
import * as rxUtils from '../functions/rx.utils';

@Injectable({
    providedIn: 'root'
})
export class WorkService {

    constructor() { }

    private work$ = new BehaviorSubject<IWork[]>([]);
    work = this.work$.asObservable();
    // addWork = (work: IWork | IWork[]) => rxUtils.add(work, this.work$);

    private dailyWork$ = new Subject<IWork[]>();
    dailyWork = this.dailyWork$.asObservable();
    addDailyWork = (work: IWork[]) => {
        rxUtils.add(work, this.work$);
        this.dailyWork$.next(work);
    }
}
