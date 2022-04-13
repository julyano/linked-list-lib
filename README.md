# Description

Contain some possibilities of implementations of linked lists

## Installation

```shell
    npm i linked-list-lib
```

## Use

```ts
import { SinglyLinkedList } from 'linked-list-lib';

interface IData<T> {
    name: T;
}

const linkedList = new SinglyLinkedList<IData<string>>();

linkedList.insertInBegin({ name: 'A'});
```