import { BaseNodeLinkedList } from "../base-node-linked-list";
import { Comparator } from "../comparator";
import { IComparator } from "../comparator.interface";
import { SinglyLinkedList } from "../singly-linked-list/singly-linked-list";
import { ICircularSinglyLinkedList } from "./circular-singly-linked-list.interface";

export class CircularSinglyLinkedList<T> extends SinglyLinkedList<T> implements ICircularSinglyLinkedList<T> {
    
    constructor(protected comparator: IComparator<T> = new Comparator<T>()) {
        super(comparator);
    }
    
    insertInBegin(data: T): BaseNodeLinkedList<T> {// O(1)
        const node = super.insertInBegin(data);
    
        if (!this.head.next) { // 1 node
            this.head.next = this.head;
        }

        this.tail.next = this.head;
        
        return node;
    }

    deleteNode(data: T): BaseNodeLinkedList<T> | null {// O(n)

        if (this.isEmpty()) {
            return null;
        }

        this.tail.next = null;
        let node = super.deleteNode(data);

        if (this.tail) {
            this.tail.next = this.head;
        }

        return node;
    }

    deleteFirstNode(): BaseNodeLinkedList<T> | null {// O(1)
        if (this.isEmpty()) {
            return null;
        }

        this.tail.next = null;
        let node = super.deleteFirstNode();

        if (this.tail) {
            this.tail.next = this.head;
        }

        return node;      
    }

    deleteLastNode(): BaseNodeLinkedList<T> | null {// O(n)
        if (this.isEmpty()) {
            return null;
        }
        
        this.tail.next = null;
        let node = super.deleteLastNode();

        if (this.tail) {
            this.tail.next = this.head;
        }

        return node;
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
            str += ' -> ';
            
            return (node.next) ? addToString(node.next) : `${str}[HEAD]`;
        };

        const result = addToString(this.head);
        this.tail.next = this.head;
        return result;
    }
}