import { DomSanitizer } from '@angular/platform-browser';
import { ICandidate } from '../models/ICandidate';
import { IOffer } from '../models/IOffer';
import * as utils from './utils';

export function createCandidates(count: number, sanitizer: DomSanitizer) {
    let candidates = [];
    for(let i = 0; i < count; i++) {
        candidates.push(createCandidate(sanitizer));
    }

    return candidates;
}

export function createCandidate(sanitizer: DomSanitizer) {
    const e = utils.createRandomEmployee();
    e.picture = utils.getAvatar(e.name, sanitizer);

    const c: ICandidate = {
        employee: e,
        daysWithoutJob: utils.makeRandomNumber(1, 10),
        salaryExpectation: Math.abs(e.expertize * 10 + utils.makeRandomNumber(-200, 200))
    }

    return c;
}

export function computeOfferAcceptanceChance(offeredSalary: number, candidate: ICandidate) {
    const e = candidate.employee;

    const timeModifier = candidate.daysWithoutJob * 1.2;
    const salaryModifier = (offeredSalary / (candidate.salaryExpectation + e.expertize * 7)) * 50
    const lazyModifier = e.laziness / 5;
    const expModifier = (1 / e.expertize) * 1000;
    
    const probability = salaryModifier + lazyModifier + expModifier + timeModifier;

    return probability > 100 ? 100 : probability;
}