import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICandidate } from '../models/ICandidate';
import { DomSanitizer } from '@angular/platform-browser';
import { TimeService } from './time.service';
import { IOffer } from '../models/IOffer';
import { EmployeeService } from './employee.service';
import { IEmployee } from '../models/IEmployee';
import * as utils from '../functions/utils';
import * as rxUtils from '../functions/rx.utils';
import * as hireUtils from '../functions/candidate-service.utils';
import * as projUtils from '../functions/project-service.utils';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    constructor(
        private sanitizer: DomSanitizer,
        private timeService: TimeService,
        private employeeService: EmployeeService)
        {
            this.timeService.onDayPassed(() => {
                this.refreshCandidates();
                this.refreshOffers();
            });
        }

    private candidates$ = new BehaviorSubject<ICandidate[]>(hireUtils.createCandidates(10, this.sanitizer));
    candidates = this.candidates$.asObservable();
    
    addCandidate = (c: ICandidate | ICandidate[]) => rxUtils.add(c, this.candidates$);
    removeCandidate = (c: ICandidate) => rxUtils.remove(c, this.candidates$, (i, v) => i.employee.id !== v.employee.id);

    private offers$ = new BehaviorSubject<IOffer[]>([]);
    offers = this.offers$.asObservable();
    
    addOffers = (o: IOffer | IOffer[]) => rxUtils.add(o, this.offers$);
    removeOffers = (offers: IOffer[]) => {
        const employeeIds = offers.map(x => x.candidate.employee.id);
        const filterFn = ((x: IOffer) => employeeIds.includes(x.candidate.employee.id));
        rxUtils.removeMany(this.offers$, filterFn);
    }

    private refreshCandidates() {
        const candidates = this.candidates$.getValue();
        
        candidates.forEach(x => x.daysWithoutJob += 1);
        
        let newCandidates = candidates.reduce((acc, x) => {
            let candidateFoundJobChance = Math.round(100 / x.daysWithoutJob);
            let candidateFoundJob = utils.maybeGetTrue(candidateFoundJobChance);
            candidateFoundJob ? () => {} : acc.push(x);

            return acc;
        }, []);

        hireUtils.createCandidates(utils.makeRandomNumber(0, 2), this.sanitizer)
            .forEach(x => newCandidates.push(x));

        this.candidates$.next(newCandidates);
    }

    private refreshOffers() {
        const expiredOffers = this.offers$.getValue()
            .map(x => ({...x, daysUntilResponse: x.daysUntilResponse - 1, daysInQueue: x.daysInQueue + 1}))
            .filter(x => x.daysUntilResponse === 0);

        console.log(expiredOffers.map(x => x.daysUntilResponse));

        let refused: IOffer[] = [];
        let accepted: IOffer[] = [];

        expiredOffers.forEach(x => {
            if(utils.maybeGetTrue(x.chanceToAccept)) {
                accepted.push(x);
            }
            else {
                refused.push(x);
            }
        });
        
        this.addCandidate(refused.map(x => x.candidate));
        this.removeOffers(refused);

        const onboardingProjectId = projUtils.generateOnboardingProject().id;

        const newEmployees = accepted.map(x => {
            const e: IEmployee = {
                ...x.candidate.employee,
                projectId: onboardingProjectId,
                salary: x.offeredSalary,
                // satisfaction: TODO
            }
            return e;
        });

        this.employeeService.addEmployees(newEmployees);
    }
}
