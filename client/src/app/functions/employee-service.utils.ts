import { IEmployee } from "../models/IEmployee";

export function computePayouts(es: IEmployee[]) {
    return es.reduce((acc, x) => {
            acc += x.salary;
            return acc;
        }, 0);
}

export function computeDailyWork(es: IEmployee[]) {
    const initialValue: Map<string, number> = new Map();
    
    const getDailyWork = (e: IEmployee) => {
        const w = 1;
        let done = w * (e.expertize - e.laziness + e.satisfaction);
        done = done < 0 ? 0 : done;
        return Math.round(done * 100) / 100;
    }

    return es.reduce((acc, x) => {
            acc[x.projectId] += getDailyWork(x);
            return acc;
        }, initialValue);
}