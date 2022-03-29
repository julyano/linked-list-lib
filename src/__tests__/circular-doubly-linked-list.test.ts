import { CircularDoublyLinkedList } from '../index';
import { IPost } from './post.interface.test';

const circularLinkedList = new CircularDoublyLinkedList<IPost>();
const arrayData = [{ title: 'A'}, { title: 'B'}, { title: 'C'}]
let testSize = 0;

describe('[CDLL] Testing null list', () => {
    test('[CDLL] insertInBegin', () => {        
        let list = circularLinkedList.traverse();
        expect(list.length).toBe(0);
        expect(circularLinkedList.size()).toBe(0);

        let foundNode = circularLinkedList.search(arrayData[0]);
        expect(foundNode).toBeNull();

        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        let deletedNode = circularLinkedList.deleteNode(arrayData[0]);
        expect(deletedNode).toBeNull();
        result = circularLinkedList.print('title');
    });
});

describe('[CDLL] Testing insertInBegin()', () => {
    test('[CDLL] insertInBegin', () => {
        let list: IPost[] = [];

        for (const data of arrayData) {
            circularLinkedList.insertInBegin(data);
            testSize++;
            list = circularLinkedList.traverse();            
            expect(list.length).toBe(testSize);
            expect(circularLinkedList.size()).toBe(testSize);
        }

        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> B <-> A <-> [HEAD]');
    });
});

describe('[CDLL] Testing deleteNode()', () => {
    test('[CDLL] delete first node', () => {
        let deletedNode = circularLinkedList.deleteNode(arrayData[2]);
        testSize--;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B <-> A <-> [HEAD]');
        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(circularLinkedList.size()).toBe(testSize);
    });

    test('[CDLL] delete middle node', () => {
        circularLinkedList.insertInBegin(arrayData[2]);
        testSize++;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> B <-> A <-> [HEAD]');
        expect(circularLinkedList.size()).toBe(testSize);
        let deletedNode = circularLinkedList.deleteNode(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> A <-> [HEAD]');
        testSize--;
        
        expect(arrayData[1]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[1].title);
        expect(circularLinkedList.size()).toBe(testSize);
    });

    test('[CDLL] delete last node', () => {
        circularLinkedList.insertInBegin(arrayData[1]);
        testSize++;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B <-> C <-> A <-> [HEAD]');
        expect(circularLinkedList.size()).toBe(testSize);
        let deletedNode = circularLinkedList.deleteNode(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B <-> C <-> [HEAD]');
        testSize--;
        
        expect(arrayData[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[0].title);
        expect(circularLinkedList.size()).toBe(testSize);
    });
    
    test('[CDLL] delete all nodes', () => {
        circularLinkedList.insertInBegin(arrayData[0]);
        testSize++;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A <-> B <-> C <-> [HEAD]');
        expect(circularLinkedList.size()).toBe(testSize);
        let deletedNode = circularLinkedList.deleteNode(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B <-> C <-> [HEAD]');
        testSize--;

        deletedNode = circularLinkedList.deleteNode(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> [HEAD]');
        testSize--;

        deletedNode = circularLinkedList.deleteNode(arrayData[2]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        testSize--;
        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(circularLinkedList.size()).toBe(testSize);
    });
});

describe('[CDLL] Testing deleteFirstNode()', () => {
    test('[CDLL] deleteFirstNode', () => {
        for (const data of arrayData) {
            circularLinkedList.insertInBegin(data);
            testSize++;
        }

        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> B <-> A <-> [HEAD]');
        let deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B <-> A <-> [HEAD]');
        testSize--;
        expect(circularLinkedList.size()).toBe(testSize);
        deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A <-> [HEAD]');
        testSize--;
        expect(circularLinkedList.size()).toBe(testSize);
        deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        testSize--;
        expect(circularLinkedList.size()).toBe(testSize);
    });
});

describe('[CDLL] Testing deleteLastNode()', () => {
    test('[CDLL] deleteLastNode', () => {
        for (const data of arrayData) {
            circularLinkedList.insertInBegin(data);
            testSize++;
        }

        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> B <-> A <-> [HEAD]');
        let deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> B <-> [HEAD]');
        testSize--;
        expect(circularLinkedList.size()).toBe(testSize);
        deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C <-> [HEAD]');
        testSize--;
        expect(circularLinkedList.size()).toBe(testSize);
        deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        testSize--;
        expect(circularLinkedList.size()).toBe(testSize);
    });
});