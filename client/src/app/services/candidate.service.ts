import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICandidate } from '../models/ICandidate';
import * as utils from '../functions/utils';
import * as hireUtils from '../functions/candidate-service.utils';
import { DomSanitizer } from '@angular/platform-browser';
import { TimeService } from './time.service';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    constructor(
        private sanitizer: DomSanitizer,
        private timeService: TimeService)
        {
            this.timeService.onDayPassed(() => {
                this.onDayPassed();
            });
        }

    private candidates$ = new BehaviorSubject<ICandidate[]>(hireUtils.createCandidates(10, this.sanitizer));

    candidates = this.candidates$.asObservable();
    
    removeCandidate(c: ICandidate) {
        const cs = this.candidates$.getValue().filter(x => x.employee.id !== c.employee.id);
        this.candidates$.next(cs);
    }

    private onDayPassed() {
        const candidates = this.candidates$.getValue();
        
        candidates.forEach(x => x.daysWithoutJob += 1);
        
        let newCandidates = candidates.reduce((acc, x) => {
            let candidateFoundJobChance = Math.round(100 / x.daysWithoutJob);
            let candidateFoundJob = utils.computeChance(candidateFoundJobChance);
            candidateFoundJob ? () => {} : acc.push(x);

            return acc;
        }, []);

        hireUtils.createCandidates(utils.makeRandomNumber(0, 2), this.sanitizer)
            .forEach(x => newCandidates.push(x));

        this.candidates$.next(newCandidates);
    }
}
