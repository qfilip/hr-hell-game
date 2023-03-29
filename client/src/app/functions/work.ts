import { IEmployee } from "../models/IEmployee";

export function doDailyWork(e: IEmployee) {
    const w = 1;
    let done = w * (e.expertize - e.laziness + e.satisfaction);
    done = done < 0 ? 0 : done;
    return Math.round(done * 100) / 100;
}