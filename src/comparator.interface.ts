export interface IComparator<T> {
    equal(a: T, b: T): boolean;
    lessThanOrEqual(a: T, b: T, akey?: string): boolean;
    strictlyLessThan(a: T, b: T, aKey?: string): boolean;
    moreThanOrEqual(a: T, b: T, aKey?: string): boolean;
    strictlyMoreThan(a: T, b: T, aKey?: string): boolean;
}