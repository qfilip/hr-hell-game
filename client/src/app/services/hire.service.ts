import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICandidate } from '../models/ICandidate';
import * as utils from '../functions/utils';
import * as hireUtils from '../functions/hire-service.utils';
import { DomSanitizer } from '@angular/platform-browser';
import { SimulationService } from './simulation.service';

@Injectable({
    providedIn: 'root'
})
export class HireService {

    constructor(
        private sanitizer: DomSanitizer,
        private simulationService: SimulationService)
        {
            this.simulationService.addOnDayPassedHandler(() => {
                this.onDayPassed();
            });
        }

    private rooster$ = new BehaviorSubject<ICandidate[]>(hireUtils.createCandidates(10, this.sanitizer));

    rooster = this.rooster$.asObservable();

    private onDayPassed() {
        const candidates = this.rooster$.getValue();
        
        candidates.forEach(x => x.daysWithoutJob += 1);
        
        let newRooster = candidates.reduce((acc, x) => {
            let candidateFoundJobChance = Math.round(100 / x.daysWithoutJob);
            let candidateFoundJob = utils.computeChance(candidateFoundJobChance);
            candidateFoundJob ? () => {} : acc.push(x);

            return acc;
        }, []);

        hireUtils.createCandidates(utils.makeRandomNumber(0, 2), this.sanitizer)
            .forEach(x => newRooster.push(x));

        this.rooster$.next(newRooster);
    }
}
