import { IEmployee } from "../models/IEmployee";
import { IProject } from "../models/IProject";
import { faker } from '@faker-js/faker';
import * as utils from './utils';

export function updateProjectsWork(workMap: Map<string, number>, ps: IProject[]) {
    return ps.map(p => {
        return {...p, completedWork: p.completedWork + workMap[p.id] }
    });
}

export function updateProjectsEmployees(es: IEmployee[], ps: IProject[]) {
    const employeeMap = new Map<string, IEmployee[]>();
    es.forEach(x => employeeMap[x.projectId].push(x));

    return ps.map(p => {
        return {...p, assignedEmployees: employeeMap[p.id] }
    });
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