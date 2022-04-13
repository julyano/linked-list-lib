import { SinglyLinkedList } from '../index';
import { IData } from './data.interface.test';

let linkedList = new SinglyLinkedList<IData<string>>();
let dataArray = [{ name: 'A'}, { name: 'B'}, { name: 'C'}];
let listSize = 0;

describe('[SLL] Testing null list', () => {
    test('[SLL] insertInBegin', () => {
        let list = linkedList.traverse();
        expect(list.length).toBe(0);
        expect(linkedList.size()).toBe(0);
        let foundNode = linkedList.search(dataArray[0]);
        expect(foundNode).toBeNull();
        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        let deletedNode = linkedList.deleteNode(dataArray[0]);
        expect(deletedNode).toBeNull();
        result = linkedList.print('name');
    });
});

describe('[SLL] Testing insertInBegin()', () => {
    test('[SLL] insertInBegin', () => {
        let list: IData<string>[] = [];

        for (const data of dataArray) {
            linkedList.insertInBegin(data);
            listSize++;
            list = linkedList.traverse();
            expect(list.length).toBe(listSize);
            expect(linkedList.size()).toBe(listSize);
        }

        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
    });
});

describe('[SLL] Testing deleteNode()', () => {
    test('[SLL] delete first node', () => {
        let deletedNode = linkedList.deleteNode(dataArray[2]);
        listSize--;
        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');        
        expect(dataArray[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[2].name);
        expect(linkedList.size()).toBe(listSize);
    });

    test('[SLL] delete middle node', () => {
        linkedList.insertInBegin(dataArray[2]);
        listSize++;
        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        expect(linkedList.size()).toBe(listSize);
        let deletedNode = linkedList.deleteNode(dataArray[1]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> A -> NULL');
        listSize--;
        
        expect(dataArray[1]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[1].name);
        expect(linkedList.size()).toBe(listSize);
    });

    describe('[SLL] Testing firstNode()', () => {
        test('[SLL] firstNode', () => {
            let first = linkedList.firstNode();
            expect(first.data).toBe(dataArray[2]);
        });
    });

    test('[SLL] delete last node', () => {
        linkedList.insertInBegin(dataArray[1]);
        listSize++;
        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> A -> NULL');
        expect(linkedList.size()).toBe(listSize);
        let deletedNode = linkedList.deleteNode(dataArray[0]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        listSize--;
        
        expect(dataArray[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[0].name);
        expect(linkedList.size()).toBe(listSize);
    });
    
    test('[SLL] delete all nodes', () => {
        linkedList.insertInBegin(dataArray[0]);
        listSize++;
        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> B -> C -> NULL');
        expect(linkedList.size()).toBe(listSize);
        let deletedNode = linkedList.deleteNode(dataArray[0]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        listSize--;

        deletedNode = linkedList.deleteNode(dataArray[1]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');
        listSize--;

        deletedNode = linkedList.deleteNode(dataArray[2]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        
        expect(dataArray[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray[2].name);
        expect(linkedList.size()).toBe(listSize);
    });
});

describe('[SLL] Testing deleteFirstNode()', () => {
    test('[SLL] deleteFirstNode', () => {
        for (const data of dataArray) {
            linkedList.insertInBegin(data);
        }

        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        let deletedNode = linkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[2]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');
        deletedNode = linkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[1]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> NULL');
        deletedNode = linkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(dataArray[0]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});

describe('[SLL] Testing deleteLastNode()', () => {
    test('[SLL] deleteLastNode', () => {
        for (const data of dataArray) {
            linkedList.insertInBegin(data);
        }

        let result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');

        let deletedNode = linkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[0]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> NULL');

        deletedNode = linkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[1]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');

        deletedNode = linkedList.deleteLastNode();
        expect(deletedNode.data).toBe(dataArray[2]);
        result = linkedList.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});


const linkedList2 = new SinglyLinkedList<IData<string>>();
const dataArray2 = [{ name: 'A'}, { name: 'A'}, { name: 'A'}];
describe('[SLL] Testing duplicate elements insertInBegin()', () => {
    test('[SLL] Duplicate elements insertInBegin()', () => {
        let list: IData<string>[] = [];

        for (const data of dataArray2) {
            linkedList2.insertInBegin(data);
            listSize++;
            list = linkedList2.traverse();
            expect(list.length).toBe(listSize);
            expect(linkedList2.size()).toBe(listSize);
        }

        let result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> A -> NULL');
    })
});

describe('[SLL] Testing duplicate elements deleteNode()', () => {
    test('[SLL] Duplicate elements delete first node', () => {
        let deletedNode = linkedList2.deleteFirstNode();
        listSize--;
        let result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> NULL');        
        expect(dataArray2[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray2[0].name);
        expect(linkedList2.size()).toBe(listSize);
    });

    test('[SLL] Duplicate elements delete middle node', () => {
        linkedList2.insertInBegin(dataArray2[0]);
        listSize++;
        let result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> A -> NULL');
        expect(linkedList2.size()).toBe(listSize);
        let deletedNode = linkedList2.deleteNode(dataArray2[0]);
        result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> NULL');
        listSize--;
        
        expect(dataArray2[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray2[0].name);
        expect(linkedList2.size()).toBe(listSize);
    });

    describe('[SLL] Testing duplicate elements firstNode()', () => {
        test('[SLL] Duplicate elements firstNode', () => {
            let first = linkedList2.firstNode();
            expect(first.data).toStrictEqual(dataArray2[0]);
        });
    });

    test('[SLL] Duplicate elements delete last node', () => {
        linkedList2.insertInBegin(dataArray2[0]);
        listSize++;
        let result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> A -> NULL');
        expect(linkedList2.size()).toBe(listSize);
        let deletedNode = linkedList2.deleteLastNode();
        result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> NULL');
        listSize--;
        
        expect(dataArray2[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray2[0].name);
        expect(linkedList2.size()).toBe(listSize);
    });
    
    test('[SLL] Duplicate elements delete all nodes', () => {
        linkedList2.insertInBegin(dataArray2[0]);
        listSize++;

        let result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> A -> NULL');
        expect(linkedList2.size()).toBe(listSize);

        let deletedNode = linkedList2.deleteNode(dataArray2[0]);
        result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> A -> NULL');
        listSize--;

        deletedNode = linkedList2.deleteNode(dataArray2[0]);
        result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> NULL');
        listSize--;
        
        deletedNode = linkedList2.deleteNode(dataArray2[0]);
        result = linkedList2.print('name');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        
        expect(dataArray2[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.name', dataArray2[0].name);
        expect(linkedList2.size()).toBe(listSize);
    });
});