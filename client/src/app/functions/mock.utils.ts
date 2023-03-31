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

        const emp: IEmployee = {
            id: faker.git.shortSha(),
            projectId: projectId,
            name: name,
            expertize: expertize,
            laziness: utils.makeRandomNumber(1, 100),
            salary: expertize * 10 + utils.makeRandomNumber(-200, 200),
            satisfaction: utils.makeRandomNumber(1, 100),
            work: [],
            picture: ''
        }

        emps.push(emp);
    }

    return emps;
}

let companyJson = `{"budget":100000,"projects":[{"id":"8017fed","name":"Onboarding","assignedEmployees":[{"id":"43849c8","projectId":"8017fed","name":"Otis Schinner","expertize":53,"laziness":5,"salary":605,"satisfaction":34,"work":[],"picture":""},{"id":"fffa7fb","projectId":"8017fed","name":"Mrs. Derrick Blick","expertize":55,"laziness":67,"salary":558,"satisfaction":28,"work":[],"picture":""}],"completedWork":0,"totalWork":0,"successPayout":0},{"id":"2a76fdd","name":"Modern Steel Fish","assignedEmployees":[{"id":"4aaad0d","projectId":"2a76fdd","name":"Maria Mante IV","expertize":13,"laziness":90,"salary":216,"satisfaction":54,"work":[],"picture":""},{"id":"d48cc8a","projectId":"2a76fdd","name":"Elaine Haley","expertize":4,"laziness":25,"salary":-126,"satisfaction":39,"work":[],"picture":""}],"completedWork":0,"totalWork":86093,"successPayout":61548},{"id":"bef908c","name":"Sleek Bronze Chips","assignedEmployees":[{"id":"3db59cb","projectId":"bef908c","name":"Amos Volkman","expertize":62,"laziness":58,"salary":527,"satisfaction":22,"work":[],"picture":""},{"id":"7ecb0f4","projectId":"bef908c","name":"Ismael Ziemann","expertize":26,"laziness":43,"salary":293,"satisfaction":39,"work":[],"picture":""}],"completedWork":0,"totalWork":71491,"successPayout":57940}],"work":[]}`;