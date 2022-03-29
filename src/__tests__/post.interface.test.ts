export interface IPost {
    title: string;
}

test('Testing Post interface', () => {
    let post: IPost = { title: 'test' };
    expect(post).toHaveProperty('title', 'test');
    expect(post).not.toHaveProperty('other');
});