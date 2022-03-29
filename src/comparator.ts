import { IComparator } from "./comparator.interface";

export class Comparator<T> implements IComparator<T> {
    equal(a: T, b: T): boolean {
        return a === b;
    }

    lessThanOrEqual(a: T, b: T): boolean {
        return a <= b;
    }

    strictlyLessThan(a: T, b: T): boolean {
        return a < b;
    }

    moreThanOrEqual(a: T, b: T): boolean {
        return a >= b;
    }

    strictlyMoreThan(a: T, b: T): boolean {
        return a > b;
    }
}