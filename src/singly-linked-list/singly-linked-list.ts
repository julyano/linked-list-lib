import { Comparator } from "../comparator";
import { IComparator } from "../comparator.interface";
import { BaseNodeLinkedList } from "../base-node-linked-list";
import { ISinglyLinkedList } from "./singly-linked-list.interface";

export class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
    protected head: BaseNodeLinkedList<T> | null = null;
    protected tail: BaseNodeLinkedList<T> | null = null;
    protected listSize = 0;

    constructor(protected comparator: IComparator<T> = new Comparator<T>()) {
        this.comparator = comparator;
    }
    
    insertInBegin(data: T): BaseNodeLinkedList<T> {// O(1)
        const node = new BaseNodeLinkedList(data);// O(1)
    
        if (this.head) {
            node.next = this.head;
        }

        
        this.head = node;
       
        if (!this.head.next) {
            this.tail = this.head;
        }

        this.listSize++;
        return node;
    }

    deleteNode(data: T): BaseNodeLinkedList<T> | null {// O(n)
        let nodeToRemove = this.search(data);// O(n)
        
        if (!nodeToRemove) {
            return null;
        }

        const result = nodeToRemove.currentNode;
        
        if (!this.head.next) { // there is 1 node
            this.head = null;
            this.tail = null;
            this.listSize--;
            
            return result;
        }

        if (!nodeToRemove.previousNode) {  // there is more than 1 node (remove first node)         
            this.head = nodeToRemove.currentNode.next;
            nodeToRemove.currentNode = null;
            this.listSize--;
            
            return result;
        }

        nodeToRemove.previousNode.next = nodeToRemove.currentNode.next;
        
        if(!nodeToRemove.currentNode.next) {
            this.tail = nodeToRemove.previousNode;
        }

        nodeToRemove.currentNode = null;
        this.listSize--;
        
        return result;
    }

    deleteFirstNode(): BaseNodeLinkedList<T> | null {// O(1)
        if (this.isEmpty()) {
            return null;
        }

        let result = this.head;

        if (!this.head.next) {
            this.head = null;
            this.tail = null;
            this.listSize--;

            return result;
        }

        this.head = this.head.next;
        this.listSize--;
        
        return result;        
    }

    deleteLastNode(): BaseNodeLinkedList<T> | null {// O(n)
        if (this.isEmpty()) {
            return null;
        }

        let cursor = this.head;
        
        if (!this.head.next) {
            this.head = null;
            this.tail = null;
            this.listSize--;

            return cursor;
        }

        while (cursor.next.next) {// O(n)
            cursor = cursor.next;
        }

        let result = this.tail;
        this.tail = null;
        this.tail = cursor;
        this.tail.next = null;
        this.listSize--;

        return result;
    }

    traverse(): T[] {  // O(n)      
        if (this.isEmpty()) {
            return [];
        }

        const array: T[] = [];
        
        const addToArray = (node: BaseNodeLinkedList<T>): T[] => {
            array.push(node.data);
            
            return node.next ? addToArray(node.next) : array;
        };

        return addToArray(this.head);
    }

    print(referenceProperty: string): string {// O(n)     
        if (this.isEmpty()) {
            return 'NULL';
        }

        let str = '[HEAD]:';

        const addToString = (node: BaseNodeLinkedList<T>): string => {
            str += (node.data instanceof Object)? 
                `${node.data[referenceProperty]}` : 
                `${node.data}`;
            str += ' -> ';
            
            return node.next ? addToString(node.next) : `${str}NULL`;
        };

        return addToString(this.head);
    }

    size(): number {// O(1)
        return this.listSize;
    }

    isEmpty(): boolean {// O(1)
        return !this.head && !this.tail;
    }

    search(data: T): any | null{// O(n)
        let currentNode = this.head;
        let previousNode = null;
        
        while (currentNode) {
            if (this.comparator.equal(currentNode.data, data)) {
                return {currentNode, previousNode};
            }

            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        return null;
    }
}