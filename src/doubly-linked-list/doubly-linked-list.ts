import { IDoublyLinkedList } from "./doubly-linked-list.interface";
import { BaseNodeLinkedList } from "../base-node-linked-list";
import { SinglyLinkedList } from "../singly-linked-list/singly-linked-list";
import { IComparator } from "../comparator.interface";
import { Comparator } from "../comparator";

export class DoublyLinkedList<T> extends SinglyLinkedList<T> implements IDoublyLinkedList<T> {
  constructor(protected comparator: IComparator<T> = new Comparator<T>()) {
    super(comparator);
  }

  insertInBegin(data: T): BaseNodeLinkedList<T> {// O(1)
    let node = super.insertInBegin(data);

    if (node.next) {
      node.next.prev = this.head;
    }

    return node;
  }

  deleteNode(data: T): BaseNodeLinkedList<T> | null{// O(n)
    let nodeToRemove = super.deleteNode(data);

    if (nodeToRemove) {
      if (nodeToRemove.next) {
        nodeToRemove.next.prev = nodeToRemove.prev;
      }
    }

    let result = nodeToRemove;
    nodeToRemove = null;

    return result;
  }

  deleteLastNode(): BaseNodeLinkedList<T> | null {// O(1)
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

    result = this.tail;
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.listSize--;

    return result;
  }
}
