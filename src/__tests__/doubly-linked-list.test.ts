import { DoublyLinkedList } from '../index';
import { IData } from './data.interface.test';

const doublyLinkedList = new DoublyLinkedList<IData<string>>();
const dataArray = [{ name: 'A'}, { name: 'B'}, { name: 'C'}]
let listSize = 0;

describe('[DLL] Testing null list', () => {
    test('[DLL] insertInBegin', () => {
        let list = doublyLinkedList.traverse();
        expect(list.length).toBe(0);
        expect(doublyLinkedList.size()).toBe(0);
        let foundNode = doublyLinkedList.search(dataArray[0]);
        expect(foundNode).toBeNull();
        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        let deletedNode = doublyLinkedList.deleteNode(dataArray[0]);
        expect(deletedNode).toBeNull();
        result = doublyLinkedList.print('name');
    });
});

describe('[DLL] Testing insertInBegin()', () => {
    test('[DLL] insertInBegin', () => {
        let list: IData<string>[] = [];

        for (const data of dataArray) {
            doublyLinkedList.insertInBegin(data);
            listSize++;
            list = doublyLinkedList.traverse();
            expect(list.length).toBe(listSize);
            expect(doublyLinkedList.size()).toBe(listSize);
        }

        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
    });
});

describe('[DLL] Testing deleteNode()', () => {
    test('[DLL] delete first node', () => {
        let deletedNode = doublyLinkedList.deleteNode(dataArray[2]);
        listSize--;
        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');        
        expect(dataArray[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[2].name);
        expect(doublyLinkedList.size()).toBe(listSize);
    });

    test('[DLL] delete middle node', () => {
        doublyLinkedList.insertInBegin(dataArray[2]);
        listSize++;
        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        expect(doublyLinkedList.size()).toBe(listSize);
        let deletedNode = doublyLinkedList.deleteNode(dataArray[1]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> A -> NULL');
        listSize--;
        
        expect(dataArray[1]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[1].name);
        expect(doublyLinkedList.size()).toBe(listSize);
    });

    test('[DLL] delete last node', () => {
        doublyLinkedList.insertInBegin(dataArray[1]);
        listSize++;
        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> A -> NULL');
        expect(doublyLinkedList.size()).toBe(listSize);
        let deletedNode = doublyLinkedList.deleteNode(dataArray[0]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        listSize--;
        
        expect(dataArray[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[0].name);
        expect(doublyLinkedList.size()).toBe(listSize);
    });
    
    test('[DLL] delete all nodes', () => {
        doublyLinkedList.insertInBegin(dataArray[0]);
        listSize++;
        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> B -> C -> NULL');
        expect(doublyLinkedList.size()).toBe(listSize);
        let deletedNode = doublyLinkedList.deleteNode(dataArray[0]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        listSize--;

        deletedNode = doublyLinkedList.deleteNode(dataArray[1]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');
        listSize--;

        deletedNode = doublyLinkedList.deleteNode(dataArray[2]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        
        expect(dataArray[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[2].name);
        expect(doublyLinkedList.size()).toBe(listSize);
    });
});

describe('[DLL] Testing deleteFirstNode()', () => {
    test('[DLL] deleteFirstNode', () => {
        for (const data of dataArray) {
            doublyLinkedList.insertInBegin(data);
        }

        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        let deletedNode = doublyLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[2]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');
        deletedNode = doublyLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[1]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> NULL');
        deletedNode = doublyLinkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[0]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});

describe('[DLL] Testing deleteLastNode()', () => {
    test('[DLL] deleteLastNode', () => {
        for (const data of dataArray) {
            doublyLinkedList.insertInBegin(data);
        }

        let result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');

        let deletedNode = doublyLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[0]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> NULL');

        deletedNode = doublyLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[1]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');

        deletedNode = doublyLinkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[2]);
        result = doublyLinkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});