export interface IComparator<T> {
    equal(a: T, b: T): boolean;
    lessThanOrEqual(a: T, b: T): boolean;
    strictlyLessThan(a: T, b: T): boolean;
    moreThanOrEqual(a: T, b: T): boolean;
    strictlyMoreThan(a: T, b: T): boolean;
}