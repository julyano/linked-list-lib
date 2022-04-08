# Description

Contain some possibilities of implementations of linked lists

## Installation

```shell
    npm i linked-list-lib
```

## Use

```ts
import { SinglyLinkedList } from 'linked-list-lib';

interface IData {
    title: string;
}

const linkedList = new SinglyLinkedList<IData<string>>();

linkedList.insertInBegin({ title: 'A'});
```