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
    // console.log(JSON.stringify(company));
    
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

        const emp: IEmployee = {
            id: faker.git.shortSha(),
            projectId: projectId,
            name: faker.name.fullName(),
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

const companyJson = `{"budget":100000,"projects":[{"id":"510d3bc","name":"Onboarding","assignedEmployees":[{"id":"fea5ea3","projectId":"510d3bc","name":"Domingo Stoltenberg PhD","expertize":40,"laziness":57,"salary":545,"satisfaction":26,"work":[],"picture":""},{"id":"edf3b4b","projectId":"510d3bc","name":"Noah Reichel","expertize":80,"laziness":17,"salary":743,"satisfaction":54,"work":[],"picture":""}],"completedWork":0,"totalWork":0,"successPayout":0},{"id":"42b71ba","name":"Licensed Soft Cheese","assignedEmployees":[{"id":"efca7ee","projectId":"42b71ba","name":"Anthony Fritsch","expertize":34,"laziness":23,"salary":398,"satisfaction":55,"work":[],"picture":""},{"id":"35bb14e","projectId":"42b71ba","name":"Gustavo Schulist","expertize":10,"laziness":53,"salary":156,"satisfaction":28,"work":[],"picture":""}],"completedWork":0,"totalWork":966,"successPayout":54634},{"id":"0ca2698","name":"Unbranded Concrete Fish","assignedEmployees":[{"id":"dcbbbc8","projectId":"0ca2698","name":"Gabriel Lubowitz","expertize":48,"laziness":44,"salary":539,"satisfaction":81,"work":[],"picture":""},{"id":"edbd933","projectId":"0ca2698","name":"Dorothy Frami","expertize":75,"laziness":69,"salary":754,"satisfaction":5,"work":[],"picture":""}],"completedWork":0,"totalWork":1827,"successPayout":69047}],"work":[]}`;