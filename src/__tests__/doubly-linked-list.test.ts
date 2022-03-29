import { DoublyLinkedList } from '../index';
import { IPost } from './post.interface.test';

const doublyLinkedList = new DoublyLinkedList<IPost>();
const arrayData = [{ title: 'A'}, { title: 'B'}, { title: 'C'}]
let testSize = 0;

describe('[DLL] Testing null list', () => {
    test('[DLL] insertInBegin', () => {
        let list = doublyLinkedList.traverse();
        expect(list.length).toBe(0);
        expect(doublyLinkedList.size()).toBe(0);
        let foundNode = doublyLinkedList.search(arrayData[0]);
        expect(foundNode).toBeNull();
        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        let deletedNode = doublyLinkedList.deleteNode(arrayData[0]);
        expect(deletedNode).toBeNull();
        result = doublyLinkedList.print('title');
    });
});

describe('[DLL] Testing insertInBegin()', () => {
    test('[DLL] insertInBegin', () => {
        let list: IPost[] = [];

        for (const data of arrayData) {
            doublyLinkedList.insertInBegin(data);
            testSize++;
            list = doublyLinkedList.traverse();
            expect(list.length).toBe(testSize);
            expect(doublyLinkedList.size()).toBe(testSize);
        }

        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
    });
});

describe('[DLL] Testing deleteNode()', () => {
    test('[DLL] delete first node', () => {
        let deletedNode = doublyLinkedList.deleteNode(arrayData[2]);
        testSize--;
        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(doublyLinkedList.size()).toBe(testSize);
    });

    test('[DLL] delete middle node', () => {
        doublyLinkedList.insertInBegin(arrayData[2]);
        testSize++;
        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        expect(doublyLinkedList.size()).toBe(testSize);
        let deletedNode = doublyLinkedList.deleteNode(arrayData[1]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> A -> NULL');
        testSize--;
        
        expect(arrayData[1]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[1].title);
        expect(doublyLinkedList.size()).toBe(testSize);
    });

    test('[DLL] delete last node', () => {
        doublyLinkedList.insertInBegin(arrayData[1]);
        testSize++;
        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> A -> NULL');
        expect(doublyLinkedList.size()).toBe(testSize);
        let deletedNode = doublyLinkedList.deleteNode(arrayData[0]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        testSize--;
        
        expect(arrayData[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[0].title);
        expect(doublyLinkedList.size()).toBe(testSize);
    });
    
    test('[DLL] delete all nodes', () => {
        doublyLinkedList.insertInBegin(arrayData[0]);
        testSize++;
        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> B -> C -> NULL');
        expect(doublyLinkedList.size()).toBe(testSize);
        let deletedNode = doublyLinkedList.deleteNode(arrayData[0]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        testSize--;

        deletedNode = doublyLinkedList.deleteNode(arrayData[1]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');
        testSize--;

        deletedNode = doublyLinkedList.deleteNode(arrayData[2]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        testSize--;
        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(doublyLinkedList.size()).toBe(testSize);
    });
});

describe('[DLL] Testing deleteFirstNode()', () => {
    test('[DLL] deleteFirstNode', () => {
        for (const data of arrayData) {
            doublyLinkedList.insertInBegin(data);
        }

        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        let deletedNode = doublyLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');
        deletedNode = doublyLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> NULL');
        deletedNode = doublyLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});

describe('[DLL] Testing deleteLastNode()', () => {
    test('[DLL] deleteLastNode', () => {
        for (const data of arrayData) {
            doublyLinkedList.insertInBegin(data);
        }

        let result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');

        let deletedNode = doublyLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> NULL');

        deletedNode = doublyLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');

        deletedNode = doublyLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = doublyLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});