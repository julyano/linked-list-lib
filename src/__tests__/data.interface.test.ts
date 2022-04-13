export interface IData<T> {
    name: T;
}

test('Testing Data interface', () => {
    let data: IData<string> = { name: 'test' };
    expect(data).toHaveProperty('name', 'test');
    expect(data).not.toHaveProperty('other');
});