import { CircularSinglyLinkedList } from '../index';
import { IData } from './data.interface.test';

const circularLinkedList = new CircularSinglyLinkedList<IData<string>>();
const dataArray = [{ name: 'A'}, { name: 'B'}, { name: 'C'}]
let listSize = 0;

describe('[CSLL] Testing null list', () => {
    test('[CSLL] insertInBegin', () => {        
        let list = circularLinkedList.traverse();
        expect(list.length).toBe(0);
        expect(circularLinkedList.size()).toBe(0);

        let foundNode = circularLinkedList.search(dataArray[0]);
        expect(foundNode).toBeNull();

        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        let deletedNode = circularLinkedList.deleteNode(dataArray[0]);
        expect(deletedNode).toBeNull();
        result = circularLinkedList.print('name');
    });
});

describe('[CSLL] Testing insertInBegin()', () => {
    test('[CSLL] insertInBegin', () => {
        let list: IData<string>[] = [];

        for (const data of dataArray) {
            circularLinkedList.insertInBegin(data);
            listSize++;
            list = circularLinkedList.traverse();            
            expect(list.length).toBe(listSize);
            expect(circularLinkedList.size()).toBe(listSize);
        }

        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
    });
});

describe('[CSLL] Testing deleteNode()', () => {
    test('[CSLL] delete first node', () => {
        let deletedNode = circularLinkedList.deleteNode(dataArray[2]);
        listSize--;
        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> [HEAD]');
        
        expect(dataArray[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[2].name);
        expect(circularLinkedList.size()).toBe(listSize);
    });

    test('[CSLL] delete middle node', () => {
        circularLinkedList.insertInBegin(dataArray[2]);
        listSize++;
        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
        expect(circularLinkedList.size()).toBe(listSize);
        let deletedNode = circularLinkedList.deleteNode(dataArray[1]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> A -> [HEAD]');
        listSize--;
        
        expect(dataArray[1]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[1].name);
        expect(circularLinkedList.size()).toBe(listSize);
    });

    test('[CSLL] delete last node', () => {
        circularLinkedList.insertInBegin(dataArray[1]);
        listSize++;
        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> A -> [HEAD]');
        expect(circularLinkedList.size()).toBe(listSize);
        let deletedNode = circularLinkedList.deleteNode(dataArray[0]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> [HEAD]');
        listSize--;
        
        expect(dataArray[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[0].name);
        expect(circularLinkedList.size()).toBe(listSize);
    });
    
    test('[CSLL] delete all nodes', () => {
        circularLinkedList.insertInBegin(dataArray[0]);
        listSize++;
        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> B -> C -> [HEAD]');
        expect(circularLinkedList.size()).toBe(listSize);
        let deletedNode = circularLinkedList.deleteNode(dataArray[0]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> [HEAD]');
        listSize--;

        deletedNode = circularLinkedList.deleteNode(dataArray[1]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> [HEAD]');
        listSize--;

        deletedNode = circularLinkedList.deleteNode(dataArray[2]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        
        expect(dataArray[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[2].name);
        expect(circularLinkedList.size()).toBe(listSize);
    });
});

describe('[CSLL] Testing deleteFirstNode()', () => {
    test('[CSLL] deleteFirstNode', () => {
        for (const data of dataArray) {
            circularLinkedList.insertInBegin(data);
            listSize++;
        }

        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
        let deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[2]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[1]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[0]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
    });
});

describe('[CSLL] Testing deleteLastNode()', () => {
    test('[CSLL] deleteLastNode', () => {
        for (const data of dataArray) {
            circularLinkedList.insertInBegin(data);
            listSize++;
        }

        let result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> [HEAD]');
        let deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[0]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[1]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> [HEAD]');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
        deletedNode = circularLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[2]);
        result = circularLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        expect(circularLinkedList.size()).toBe(listSize);
    });
});