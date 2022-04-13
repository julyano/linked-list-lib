import { IComparator } from "./comparator.interface";
import * as _ from "lodash";

export class Comparator<T> implements IComparator<T> {
    equal(a: T, b: T): boolean {
        if (this.isObject(a) || this.isObject(b)) {
            return _.isEqual(a, b);
        }

        return a === b;        
    }

    lessThanOrEqual(a: T, b: T, aKey?: string): boolean {
        if (this.isObject(a) || this.isObject(b)) {
            return this.matchesLessThanOrEqual(aKey, a)(b);
        }

        return a <= b;
    }

    strictlyLessThan(a: T, b: T, aKey?: string): boolean {
        if (this.isObject(a) || this.isObject(b)) {
            return this.matchesStrictlyLessThan(aKey, a)(b);
        }

        return a < b;
    }

    moreThanOrEqual(a: T, b: T, aKey?: string): boolean {
        if (this.isObject(a) || this.isObject(b)) {
            return this.matchesMoreThanOrEqual(aKey, a)(b);
        }

        return a >= b;
    }

    strictlyMoreThan(a: T, b: T, aKey?: string): boolean {
        if (this.isObject(a) || this.isObject(b)) {
            return this.matchesStrictlyMoreThan(aKey, a)(b);
        }

        return a > b;
    }

    private isObject(value: any) {
        return value !== null && typeof value === 'object'
    }

    private matchesLessThanOrEqual(key: string, srcValue: any) {
        return (object: any) => {
            if (object == null) {
                return false
            }

            return object[key] <= srcValue &&
                (srcValue !== undefined || (key in Object(object)))
        }
    }

    private matchesMoreThanOrEqual(key: string, srcValue: any) {
        return (object: any) => {
            if (object == null) {
                return false
            }

            return object[key] >= srcValue &&
                (srcValue !== undefined || (key in Object(object)))
        }
    }

    private matchesStrictlyMoreThan(key: string, srcValue: any) {
        return (object: any) => {
            if (object == null) {
                return false
            }

            return object[key] > srcValue &&
                (srcValue !== undefined || (key in Object(object)))
        }
    }

    private matchesStrictlyLessThan(key: string, srcValue: any) {
        return (object: any) => {
            if (object == null) {
                return false
            }

            return object[key] < srcValue &&
                (srcValue !== undefined || (key in Object(object)))
        }
    }
}