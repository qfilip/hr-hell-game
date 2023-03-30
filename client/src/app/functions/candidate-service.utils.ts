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
    const chance = 1;
    const timeModifier = candidate.daysWithoutJob * 3;
    chance * (candidate.employee.laziness - candidate.employee.expertize + timeModifier);
}

type Args = {
    offer: number
    expect: number
    days: number
    lazy: number
    exp: number
}

export function compute(x: Args) {
    const timeModifier = x.days * 2;
    
    const salaryModifier = (x.offer / (x.expect + x.exp * 7)) * 50
    console.log(salaryModifier);
    
    const lazyModifier = x.lazy/5;
    console.log(lazyModifier);
    
    const expModifier = x.exp/2;
    console.log(expModifier);
    
    const r = salaryModifier + lazyModifier + expModifier + timeModifier;
    
    console.log(r);
}

let args = {
    offer: 800,
    expect: 600,
    days: 14,
    lazy: 100,
    exp: 70,
}