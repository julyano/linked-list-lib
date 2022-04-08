export interface IData<T> {
    title: T;
}

test('Testing Data interface', () => {
    let data: IData<string> = { title: 'test' };
    expect(data).toHaveProperty('title', 'test');
    expect(data).not.toHaveProperty('other');
});