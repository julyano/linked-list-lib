import { IDoublyLinkedList } from "./doubly-linked-list.interface";
import { BaseNodeLinkedList } from "../base-node-linked-list";
import { SinglyLinkedList } from "../singly-linked-list/singly-linked-list";

export class DoublyLinkedList<T> extends SinglyLinkedList<T> implements IDoublyLinkedList<T> {
  constructor() {
    super();
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
}
