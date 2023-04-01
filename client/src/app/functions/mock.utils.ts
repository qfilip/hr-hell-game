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
    //     projects: mockProjects(),
    //     work: []
    // }
    // companyJson = JSON.stringify(company);
    // console.log(companyJson);

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
            totalWork: utils.makeRandomNumber(30_000, 200_000),
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
        const salaryBase = expertize * 10;

        const emp: IEmployee = {
            id: faker.git.shortSha(),
            projectId: projectId,
            name: name,
            expertize: expertize,
            laziness: utils.makeRandomNumber(1, 100),
            salary: salaryBase + addOrSubstractRandomPercent(salaryBase),
            satisfaction: utils.makeRandomNumber(1, 100),
            work: [],
            picture: ''
        }

        emps.push(emp);
    }

    return emps;
}

function addOrSubstractRandomPercent(total: number) {
    const percentage = utils.makeRandomNumber(-20, 20);
    return Math.floor(total / 100 * percentage);
}

let companyJson = `{"budget":100000,"projects":[{"id":"da10da2","name":"Onboarding","assignedEmployees":[{"id":"e1fcd15","projectId":"da10da2","name":"Keith Quigley","expertize":12,"laziness":70,"salary":126,"satisfaction":3,"work":[],"picture":""},{"id":"d75bcf5","projectId":"da10da2","name":"Cecil Hilpert MD","expertize":52,"laziness":42,"salary":613,"satisfaction":79,"work":[],"picture":""}],"completedWork":0,"totalWork":0,"successPayout":0},{"id":"d3af945","name":"Awesome Granite Tuna","assignedEmployees":[{"id":"ed0eefb","projectId":"d3af945","name":"Whitney Dibbert","expertize":91,"laziness":96,"salary":1028,"satisfaction":70,"work":[],"picture":""},{"id":"ee2d3aa","projectId":"d3af945","name":"Ted King DDS","expertize":10,"laziness":15,"salary":108,"satisfaction":26,"work":[],"picture":""}],"completedWork":0,"totalWork":186590,"successPayout":69606},{"id":"0d45ecd","name":"Gorgeous Metal Salad","assignedEmployees":[{"id":"f3dc222","projectId":"0d45ecd","name":"Randy Fadel","expertize":82,"laziness":67,"salary":738,"satisfaction":49,"work":[],"picture":""},{"id":"0acedfc","projectId":"0d45ecd","name":"Kristie Hilpert","expertize":26,"laziness":27,"salary":239,"satisfaction":33,"work":[],"picture":""}],"completedWork":0,"totalWork":154348,"successPayout":61342}],"work":[]}`;