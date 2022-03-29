import { BaseNodeLinkedList } from "../base-node-linked-list";
import { DoublyLinkedList } from "../doubly-linked-list/doubly-linked-list";
import { ICircularDoublyLinkedList } from "./circular-doubly-linked-list.interface";

export class CircularDoublyLinkedList<T> extends DoublyLinkedList<T> implements ICircularDoublyLinkedList<T> {
    
    constructor() {
        super();
    }
    
    insertInBegin(data: T): BaseNodeLinkedList<T> {// O(n)
        const node = super.insertInBegin(data);
    
        if (!this.head.next) {
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            let cursor = this.head.next;

            while(!this.comparator.equal(cursor.next.data, this.head.next.data)) {// O(n)
                cursor = cursor.next;
            }

            this.head.next.prev = this.head;
            this.head.prev = cursor;
            cursor.next = this.head;
        }
        
        return node;
    }

    deleteNode(data: T): BaseNodeLinkedList<T> | null {// O(n)
        let nodeToRemove = this.search(data);

        if (!nodeToRemove) {
            return null;
        }
        
        
        if (!nodeToRemove.currentNode) { // there is no data
            return null;
        }
        
        const result = nodeToRemove.currentNode;
        
        if (this.comparator.equal(this.head.data, this.head.next.data)) { // there is 1 node
            this.head = null;
            this.listSize--;
            
            return result;
        }
        
        if (!nodeToRemove.previousNode) {  // there is more than 1 node (remove first node)         
            let lastNode = this.getLastNode();
            this.head = nodeToRemove.currentNode.next;
            lastNode.next = this.head;
            this.head.prev = lastNode;
            nodeToRemove.currentNode = null;
            this.listSize--;
            
            return result;
        }

        nodeToRemove.previousNode.next = nodeToRemove.currentNode.next;
        nodeToRemove.previousNode.next.prev = nodeToRemove.previousNode;
        nodeToRemove.currentNode = null;
        this.listSize--;
        
        return result;
    }

    deleteFirstNode(): BaseNodeLinkedList<T> | null {// O(1)
        if (this.isEmpty()) {
            return null;
        }

        let result = this.head;

        if (this.comparator.equal(this.head.data, this.head.next.data)) {
            this.head = null;
            this.listSize--;

            return result;
        }
       
        let lastNode = this.getLastNode();// O(1)
        this.head = this.head.next;
        lastNode.next = null;
        lastNode.next = this.head;
        this.head.prev = lastNode;
        this.listSize--;
        
        return result;        
    }

    deleteLastNode(): BaseNodeLinkedList<T> | null {// O(n)
        if (this.isEmpty()) {
            return null;
        }

        let cursor = this.head;
        
        if (this.comparator.equal(this.head.data, this.head.next.data)) {
            this.head = null;
            this.listSize--;

            return cursor;
        }
        
        let previousNode = null;

        while (!this.comparator.equal(this.head.data, cursor.next.data)) {// O(n)
            previousNode = cursor;
            cursor = cursor.next;
        }

        let lastNode = cursor;
        cursor = null;
        previousNode.next = this.head;
        this.head.prev = previousNode;
        this.listSize--;

        return lastNode;
    }

    traverse(): T[] {// O(n)        
        if (this.isEmpty()) {
            return [];
        }

        const array: T[] = [];
        
        const addToArray = (node: BaseNodeLinkedList<T>): T[] => {
            array.push(node.data);
            
            return (!this.comparator.equal(node.next.data, this.head.data)) ? addToArray(node.next) : array;
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
            str += ' <-> ';
            
            return (!this.comparator.equal(node.next.data, this.head.data)) ? addToString(node.next) : `${str}[HEAD]`;
        };

        return addToString(this.head);
    }

    size(): number {// O(1)
        return this.listSize;
    }

    isEmpty(): boolean {// O(1)
        return !this.head;
    }

    search(data: T): any | null{// O(n)
        let currentNode = this.head;
        let previousNode = null;

        if (!currentNode) {
            return null;
        }        

        if (this.comparator.equal(data, this.head.data)) {
            return {currentNode, previousNode};
        }
        
        while (!this.comparator.equal(currentNode.next.data, this.head.data)) {
            if (this.comparator.equal(currentNode.data, data)) {
                return {currentNode, previousNode};
            }

            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        if (this.comparator.equal(currentNode.data, data)) {
            return {currentNode, previousNode};
        }

        return null;
    }

    getLastNode(): BaseNodeLinkedList<T> {// O(1)
        if (!this.head) {
            return null;
        }

        return this.head.prev;
    }
}