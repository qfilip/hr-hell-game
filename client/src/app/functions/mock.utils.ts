import { ICompany } from "../models/ICompany";
import { IProject } from "../models/IProject";

import { faker } from '@faker-js/faker';
import * as utils from "./utils";
import { IEmployee } from "../models/IEmployee";
import { ɵDomSanitizerImpl } from "@angular/platform-browser";

const sanitizer = new ɵDomSanitizerImpl(document);
let company: ICompany;

export function mockCompany() {
    if(company) {
        return company;
    }

    // company = {
    //     budget: 100_000.,
    //     projects: mockProjects()
    // }
    
    company = JSON.parse(companyJson) as ICompany;
    company.projects.forEach(p => p.assignedEmployees.forEach(e => e.picture = utils.getAvatar(e.name, sanitizer)));
    
    return company;
}

function mockProjects() {
    let ps = [];
    
    const onboardingId = faker.git.shortSha()
    const onboarding: IProject = {
        id: onboardingId,
        name: 'Onboarding',
        assignedEmployees: mockEmployees(onboardingId),
        completedWork: 0,
        totalWork: 0,
        successPayout: 0
    }

    ps.push(onboarding);

    for(let i = 0; i < 2; i++) {
        const id = faker.git.shortSha();
        const p: IProject = {
            id: id,
            name: faker.commerce.productName(),
            assignedEmployees: mockEmployees(id),
            completedWork: 0,
            totalWork: utils.makeRandomNumber(500, 2000),
            successPayout: utils.makeRandomNumber(50000, 70000)
        };
        ps.push(p);
    }
    
    return ps;
}

function mockEmployees(projectId: string) {
    let emps = [];
    for(let i = 0; i < 2; i++) {
        const name = faker.name.fullName();
        const expertize = utils.makeRandomNumber(1, 100);

        const e: IEmployee = {
            id: faker.git.shortSha(),
            projectId: projectId,
            name: faker.name.fullName(),
            expertize: expertize,
            laziness: utils.makeRandomNumber(1, 100),
            salary: expertize * 10 + utils.makeRandomNumber(-200, 200),
            satisfaction: utils.makeRandomNumber(1, 100),
            picture: ''
        }

        emps.push(e);
    }

    return emps;
}

const companyJson = `{"budget":100000,"projects":[{"id":"1e2b6ff","name":"Onboarding","assignedEmployees":[{"id":"abd59c1","projectId":"1e2b6ff","name":"Miss Reginald McKenzie","expertize":4,"laziness":64,"salary":62,"satisfaction":87,"picture":""},{"id":"dacdba3","projectId":"1e2b6ff","name":"Clara Gerlach","expertize":41,"laziness":45,"salary":314,"satisfaction":21,"picture":""}],"completedWork":0,"totalWork":0,"successPayout":0},{"id":"f88a7a4","name":"Sleek Bronze Tuna","assignedEmployees":[{"id":"bbb1adc","projectId":"f88a7a4","name":"Laurence Gibson","expertize":89,"laziness":61,"salary":824,"satisfaction":73,"picture":""},{"id":"e60c1cc","projectId":"f88a7a4","name":"May Gleason","expertize":89,"laziness":22,"salary":838,"satisfaction":20,"picture":""}],"completedWork":0,"totalWork":671,"successPayout":56438},{"id":"fa6d42c","name":"Handmade Metal Cheese","assignedEmployees":[{"id":"3f0f3c9","projectId":"fa6d42c","name":"Herman Dickens","expertize":82,"laziness":83,"salary":823,"satisfaction":26,"picture":""},{"id":"47abeee","projectId":"fa6d42c","name":"Marc Schneider","expertize":88,"laziness":79,"salary":965,"satisfaction":29,"picture":""}],"completedWork":0,"totalWork":1333,"successPayout":59642}]}`;