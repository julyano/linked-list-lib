import { SinglyLinkedList } from '../index';
import { IPost } from './post.interface.test';

const linkedList = new SinglyLinkedList<IPost>();
const arrayData = [{ title: 'A'}, { title: 'B'}, { title: 'C'}]
let listSize = 0;

describe('[SLL] Testing null list', () => {
    test('[SLL] insertInBegin', () => {
        let list = linkedList.traverse();
        expect(list.length).toBe(0);
        expect(linkedList.size()).toBe(0);
        let foundNode = linkedList.search(arrayData[0]);
        expect(foundNode).toBeNull();
        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        let deletedNode = linkedList.deleteNode(arrayData[0]);
        expect(deletedNode).toBeNull();
        result = linkedList.print('title');
    });
});

describe('[SLL] Testing insertInBegin()', () => {
    test('[SLL] insertInBegin', () => {
        let list: IPost[] = [];

        for (const data of arrayData) {
            linkedList.insertInBegin(data);
            listSize++;
            list = linkedList.traverse();
            expect(list.length).toBe(listSize);
            expect(linkedList.size()).toBe(listSize);
        }

        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
    });
});

describe('[SLL] Testing deleteNode()', () => {
    test('[SLL] delete first node', () => {
        let deletedNode = linkedList.deleteNode(arrayData[2]);
        listSize--;
        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(linkedList.size()).toBe(listSize);
    });

    test('[SLL] delete middle node', () => {
        linkedList.insertInBegin(arrayData[2]);
        listSize++;
        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        expect(linkedList.size()).toBe(listSize);
        let deletedNode = linkedList.deleteNode(arrayData[1]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> A -> NULL');
        listSize--;
        
        expect(arrayData[1]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[1].title);
        expect(linkedList.size()).toBe(listSize);
    });

    test('[SLL] delete last node', () => {
        linkedList.insertInBegin(arrayData[1]);
        listSize++;
        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> A -> NULL');
        expect(linkedList.size()).toBe(listSize);
        let deletedNode = linkedList.deleteNode(arrayData[0]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        listSize--;
        
        expect(arrayData[0]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[0].title);
        expect(linkedList.size()).toBe(listSize);
    });
    
    test('[SLL] delete all nodes', () => {
        linkedList.insertInBegin(arrayData[0]);
        listSize++;
        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> B -> C -> NULL');
        expect(linkedList.size()).toBe(listSize);
        let deletedNode = linkedList.deleteNode(arrayData[0]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> C -> NULL');
        listSize--;

        deletedNode = linkedList.deleteNode(arrayData[1]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');
        listSize--;

        deletedNode = linkedList.deleteNode(arrayData[2]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
        listSize--;
        
        expect(arrayData[2]).toMatchObject(deletedNode.data);
        expect(deletedNode).toHaveProperty('data.title', arrayData[2].title);
        expect(linkedList.size()).toBe(listSize);
    });
});

describe('[SLL] Testing deleteFirstNode()', () => {
    test('[SLL] deleteFirstNode', () => {
        for (const data of arrayData) {
            linkedList.insertInBegin(data);
        }

        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');
        let deletedNode = linkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:B -> A -> NULL');
        deletedNode = linkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:A -> NULL');
        deletedNode = linkedList.deleteFirstNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});

describe('[SLL] Testing deleteLastNode()', () => {
    test('[SLL] deleteLastNode', () => {
        for (const data of arrayData) {
            linkedList.insertInBegin(data);
        }

        let result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> A -> NULL');

        let deletedNode = linkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[0]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> B -> NULL');

        deletedNode = linkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[1]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('[HEAD]:C -> NULL');

        deletedNode = linkedList.deleteLastNode();
        expect(deletedNode.data).toBe(arrayData[2]);
        result = linkedList.print('title');
        expect(result).toBeDefined();
        expect(result).toEqual<string>('NULL');
    });
});