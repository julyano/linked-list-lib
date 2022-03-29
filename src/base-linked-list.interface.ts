import { BaseNodeLinkedList } from "./base-node-linked-list";

export interface IBaseLinkedList<T> {
  insertInBegin(data: T): BaseNodeLinkedList<T>;
  deleteNode(data: T): BaseNodeLinkedList<T> | null;
  deleteFirstNode(): BaseNodeLinkedList<T> | null;
  deleteLastNode(): BaseNodeLinkedList<T> | null;
  traverse(): T[];
  print(name: string): string;
  size(): number;
  isEmpty(): boolean;
  search(data: T): any | null;
}
  