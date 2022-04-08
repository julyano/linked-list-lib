import { BaseNodeLinkedList } from "../base-node-linked-list";
import { Comparator } from "../comparator";
import { IComparator } from "../comparator.interface";
import { DoublyLinkedList } from "../doubly-linked-list/doubly-linked-list";
import { ICircularDoublyLinkedList } from "./circular-doubly-linked-list.interface";

export class CircularDoublyLinkedList<T> extends DoublyLinkedList<T> implements ICircularDoublyLinkedList<T> {
    
    constructor(protected comparator: IComparator<T> = new Comparator<T>()) {
        super(comparator);
    }
    
    insertInBegin(data: T): BaseNodeLinkedList<T> {// O(n)
        const node = super.insertInBegin(data);
    
        if (!this.head.next) {
            this.head.next = this.head;
            this.head.prev = this.head;
            this.tail = this.head;
        } else {
            this.head.prev = this.tail;
            this.tail.next = this.head;
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
        this.tail.next = null;

        if (!this.head.next) { // there is 1 node
            this.head = null;
            this.tail = null;
            this.listSize--;
            
            return result;
        }
        
        if (!nodeToRemove.previousNode) {  // there is more than 1 node (remove first node)
            this.head = nodeToRemove.currentNode.next;
            this.tail.next = this.head;
            this.head.prev = this.tail;
            nodeToRemove.currentNode = null;
            this.listSize--;
            
            return result;
        }

        nodeToRemove.previousNode.next = nodeToRemove.currentNode.next;

        if (nodeToRemove.previousNode.next) {
            nodeToRemove.previousNode.next.prev = nodeToRemove.previousNode;
        }

        nodeToRemove.currentNode = null;

        if (!this.tail.prev) {
            this.tail = nodeToRemove.previousNode;
            this.head.prev = this.tail;
        }

        this.listSize--;
        
        return result;
    }

    deleteFirstNode(): BaseNodeLinkedList<T> | null {// O(1)
        if (this.isEmpty()) {
            return null;
        }

        let result = this.head;

        this.tail.next = null;

        if (!this.head.next) { // there is 1 node
            this.head = null;
            this.tail = null;
            this.listSize--;
            
            return result;
        }

        this.head = this.head.next;
        this.tail.next = this.head;
        this.head.prev = this.tail;
        this.listSize--;
        
        return result;        
    }

    deleteLastNode(): BaseNodeLinkedList<T> | null {// O(1)
        if (this.isEmpty()) {
            return null;
        }

        this.tail.next = null;
        let cursor = this.head;

        if (!this.head.next) {
            this.head = null;
            this.tail = null;
            this.listSize--;

            return cursor;
        }

        const lastNode = this.tail;
        const ant = this.tail.prev;
        this.tail = null;
        this.tail = ant;
        this.tail.next = this.head;
        this.head.prev = this.tail;
        this.listSize--;

        return lastNode;
    }

    traverse(): T[] {// O(n)        
        if (this.isEmpty()) {
            return [];
        }

        const array: T[] = [];
        this.tail.next = null;
        
        const addToArray = (node: BaseNodeLinkedList<T>): T[] => {
            array.push(node.data);
            
            return (node.next) ? addToArray(node.next) : array;
        };

        const result = addToArray(this.head);
        this.tail.next = this.head;
        return result;
    }

    print(referenceProperty: string): string {// O(n)    
        if (this.isEmpty()) {
            return 'NULL';
        }

        let str = '[HEAD]:';
        this.tail.next = null;

        const addToString = (node: BaseNodeLinkedList<T>): string => {
            str += (node.data instanceof Object)? 
                `${node.data[referenceProperty]}` : 
                `${node.data}`;
            str += ' <-> ';
            
            return (node.next) ? addToString(node.next) : `${str}[HEAD]`;
        };

        const result = addToString(this.head);
        this.tail.next = this.head;
        return result;
    }

    search(data: T): any | null{// O(n)
        if (super.isEmpty()) {
            return null;
        }

        this.tail.next = null;
        const result = super.search(data);
        this.tail.next = this.head;
        return result;
    }
}