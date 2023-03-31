import { IEmployee } from "../models/IEmployee";
import { IWork } from "../models/IWork";

export function computePayouts(es: IEmployee[]) {
    return es.reduce((acc, x) => {
            acc += x.salary;
            return acc;
        }, 0);
}

export function computeDailyWork(es: IEmployee[], date: Date) {
    const initialValue: IWork[] = [];
    
    const getDailyWork = (e: IEmployee) => {
        const w = 1;
        let done = w * (e.expertize - e.laziness + e.satisfaction);
        done = done < 0 ? 0 : done;
        const work: IWork = {
            employeeId: e.id,
            projectId: e.projectId,
            date: date,
            points: Math.round(done * 100) / 100
        }

        return work;
    }

    return es.reduce((acc, x) => {
            acc.push(getDailyWork(x));
            return acc;
        }, initialValue);
}