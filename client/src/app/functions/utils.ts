import { DomSanitizer } from "@angular/platform-browser";
import { avataaars } from '@dicebear/collection';
import { createAvatar } from "@dicebear/core";
import { IEmployee } from "../models/IEmployee";
import { faker } from '@faker-js/faker';

export function getAvatar(name: string, sanitizer: DomSanitizer) {
    const avatar = createAvatar(avataaars, {
        seed: name,
        size: 128
        // ... other options
    }).toDataUriSync();

    return sanitizer.bypassSecurityTrustResourceUrl(avatar);
}

export function createRandomEmployee() {
    const e: IEmployee = {
        id: makeId(),
        projectId: null,
        name: faker.name.fullName(),
        salary: 0,
        laziness: makeRandomNumber(1, 100),
        expertize: makeRandomNumber(1, 100),
        satisfaction: 0,
        picture: null
    }

    return e;
}

export function computeChance(successChancePercentage: number) {
    let chances: { willHappen: boolean, orderNumber: number }[] = [];
    
    for(let i = 0; i < successChancePercentage; i++) {
        chances.push({
            willHappen: true,
            orderNumber: makeRandomNumber(0, 99)
        });
    }

    let failureChancePercentage = 100 - successChancePercentage;

    for(let i = 0; i < failureChancePercentage; i++) {
        chances.push({
            willHappen: false,
            orderNumber: makeRandomNumber(0, 99)
        });
    }

    chances.sort((a, b) => a.orderNumber - b.orderNumber);
    
    return chances[makeRandomNumber(0, 99)].willHappen;
}

export function makeId() {
    return Math.random().toString(32).substring(2, 12);
}

export function makeRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export function mockCompany() {
    
}