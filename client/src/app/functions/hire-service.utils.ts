import { DomSanitizer } from '@angular/platform-browser';
import { ICandidate } from '../models/ICandidate';
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
        salaryExpectation: e.expertize * 10 + utils.makeRandomNumber(-200, 200)
    }

    return c;
}