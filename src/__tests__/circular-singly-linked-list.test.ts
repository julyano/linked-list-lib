import { CircularSinglyLinkedList } from '../index';
import { IData } from './data.interface.test';

const circularLinkedList = new CircularSinglyLinkedList<IData<string>>();
const arrayData = [{ title: 'A'}, { title: 'B'}, { title: 'C'}]
let listSize = 0;

describe('[CSLL] Testing null list', () => {
    test('[CSLL] insertInBegin', () => {        
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

describe('[CSLL] Testing insertInBegin()', () => {
    test('[CSLL] insertInBegin', () => {
        let list: IData<string>[] = [];

        for (const data of arrayData) {
            circularLinkedList.insertInBegin(data);
            listSize++;
            list = circularLinkedList.traverse();            
            expect(list.length).toBe(listSize);
            expect(circularLinkedList.size()).toBe(listSize);
        }

        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
    });
});

describe('[CSLL] Testing deleteNode()', () => {
    test('[CSLL] delete first node', () => {
        let deletedNode = circularLinkedList.deleteNode(arrayData[2]);
        listSize--;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> [HEAD]');
        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(circularLinkedList.size()).toBe(listSize);
    });

    test('[CSLL] delete middle node', () => {
        circularLinkedList.insertInBegin(arrayData[2]);
        listSize++;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
        expect(circularLinkedList.size()).toBe(listSize);
        let deletedNode = circularLinkedList.deleteNode(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> A -> [HEAD]');
        listSize--;
        
        expect(arrayData[1]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[1].title);
        expect(circularLinkedList.size()).toBe(listSize);
    });

    test('[CSLL] delete last node', () => {
        circularLinkedList.insertInBegin(arrayData[1]);
        listSize++;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> A -> [HEAD]');
        expect(circularLinkedList.size()).toBe(listSize);
        let deletedNode = circularLinkedList.deleteNode(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> [HEAD]');
        listSize--;
        
        expect(arrayData[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[0].title);
        expect(circularLinkedList.size()).toBe(listSize);
    });
    
    test('[CSLL] delete all nodes', () => {
        circularLinkedList.insertInBegin(arrayData[0]);
        listSize++;
        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> B -> C -> [HEAD]');
        expect(circularLinkedList.size()).toBe(listSize);
        let deletedNode = circularLinkedList.deleteNode(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> [HEAD]');
        listSize--;

        deletedNode = circularLinkedList.deleteNode(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> [HEAD]');
        listSize--;

        deletedNode = circularLinkedList.deleteNode(arrayData[2]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(circularLinkedList.size()).toBe(listSize);
    });
});

describe('[CSLL] Testing deleteFirstNode()', () => {
    test('[CSLL] deleteFirstNode', () => {
        for (const data of arrayData) {
            circularLinkedList.insertInBegin(data);
            listSize++;
        }

        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
        let deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
    });
});

describe('[CSLL] Testing deleteLastNode()', () => {
    test('[CSLL] deleteLastNode', () => {
        for (const data of arrayData) {
            circularLinkedList.insertInBegin(data);
            listSize++;
        }

        let result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
        let deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = circularLinkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
    });
});