import { IEmployee } from "../models/IEmployee";
import { IProject } from "../models/IProject";
import { faker } from '@faker-js/faker';
import * as utils from './utils';
import { IWork } from "../models/IWork";

export function updateProjectsWork(workData: IWork[], ps: IProject[]) {
    return ps.map(p => {
        const dailyWork = workData
            .filter(x => x.projectId === p.id)
            .reduce((acc, next) => { return acc + next.points }, 0);
        
            return {...p, completedWork: p.completedWork + dailyWork }
    });
}

export function updateProjectsEmployees(es: IEmployee[], ps: IProject[]) {
    const employeeMap = new Map<string, IEmployee[]>();
    es.forEach(x => employeeMap[x.projectId] ? employeeMap[x.projectId].push(x) : employeeMap[x.projectId] = [x]);

    return ps.map(p => {
        return {...p, assignedEmployees: employeeMap[p.id] }
    });
}

export function generateOnboardingProject() {
    const p: IProject = {
        id: faker.git.shortSha(),
        name: 'Onboarding',
        assignedEmployees: [],
        completedWork: 0,
        totalWork: 0,
        successPayout: 0
    }

    return p;
}

export function generateProposals(count: number) {
    let ps = [];
    for(let i = 0; i < count; i++) {
        const p: IProject = {
            id: faker.git.shortSha(),
            name: faker.commerce.productName(),
            assignedEmployees: [],
            completedWork: 0,
            totalWork: utils.makeRandomNumber(500, 2000),
            successPayout: utils.makeRandomNumber(50000, 70000)
        };
        ps.push(p);
    }

    return ps;
}