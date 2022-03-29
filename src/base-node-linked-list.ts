import { BaseNode } from "./base-node";

export class BaseNodeLinkedList<T> extends  BaseNode<T> {
    public next: BaseNodeLinkedList<T> | null = null;
    public prev?: BaseNodeLinkedList<T> | null = null;
    
    constructor(public data: T) {
        super(data);
    }
}
  