import { Comparator } from "../comparator";

const comparator = new Comparator<number>();

describe('[COMP] Testing comparator', () => {
    test('[COMP] equal()', () => {
        expect(comparator.equal(10, 10)).toBe(true);
        expect(comparator.equal(10, 11)).toBe(false);
        expect(comparator.equal(10, 9)).toBe(false);
    })

    test('[COMP] lessThanOrEqual()', () => {
        expect(comparator.lessThanOrEqual(10, 20)).toBe(true);
        expect(comparator.lessThanOrEqual(10, 10)).toBe(true);
        expect(comparator.lessThanOrEqual(10, 9)).toBe(false);
    })

    test('[COMP] moreThanOrEqual()', () => {
        expect(comparator.moreThanOrEqual(20, 10)).toBe(true);
        expect(comparator.moreThanOrEqual(20, 10)).toBe(true);
        expect(comparator.moreThanOrEqual(19, 20)).toBe(false);
    })

    test('[COMP] strictlyLessThan()', () => {
        expect(comparator.strictlyLessThan(10, 11)).toBe(true);
        expect(comparator.strictlyLessThan(10, 10)).toBe(false);
        expect(comparator.strictlyLessThan(10, 9)).toBe(false);
    })

    test('[COMP] strictlyMoreThan()', () => {
        expect(comparator.strictlyMoreThan(10, 9)).toBe(true);
        expect(comparator.strictlyMoreThan(10, 10)).toBe(false);
        expect(comparator.strictlyMoreThan(10, 11)).toBe(false);
    })
});