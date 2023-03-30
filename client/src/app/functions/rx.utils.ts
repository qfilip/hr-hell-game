import { BehaviorSubject } from "rxjs";

export function add<T>(x: T | T[], x$: BehaviorSubject<T[]>) {
    const xs = Array.isArray(x) ? x : [x];
    const vals = x$.getValue().concat(xs);
    x$.next(vals);
}

export function edit<T>(x$: BehaviorSubject<T[]>, reducerFn: (acc: T[], v:T) => T[]) {
    const vals = this.x$.getValue().reduce(reducerFn, []);
    x$.next(vals);
}

export function remove<T>(x: T, x$: BehaviorSubject<T[]>, filterFn: (i: T, v: T) => boolean) {
    const vals = x$.getValue().filter(item => filterFn(item, x));
    x$.next(vals);
}

export function removeMany<T>(x$: BehaviorSubject<T[]>, filterFn: (i: T) => boolean) {
    const vals = x$.getValue().filter(filterFn);
    x$.next(vals);
}

