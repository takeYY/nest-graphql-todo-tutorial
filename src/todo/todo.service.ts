// src/todo/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './models/todo.models';

@Injectable()
export class TodoService {
  // 今回はDBと接続しないのでメモリ上にTodoを保存します。
  private todos: Todo[] = [
    {
      id: 'gendo',
      title: '使徒、襲来',
      description: 'エヴァに乗れ！',
      status: TodoStatus.IN_PROGRESS,
      createdAt: new Date('1995-10-04'),
      updatedAt: new Date('1995-10-04'),
    },
    {
      id: 'rei',
      title: '決戦、第3新東京市',
      description: 'どんな顔すればいいのかわからないの',
      status: TodoStatus.COMPLETE,
      createdAt: new Date('1995-11-08'),
      updatedAt: new Date('1995-11-08'),
    },
  ];

  // 全件取得のメソッド
  findAll(): Todo[] {
    return this.todos;
  }
  // idを元に一件取得のメソッド
  findOneById(id: string): Todo {
    const result = this.todos.find((todo) => id === todo.id);
    if (!result) {
      // なかったら404エラーを返す。ビルトインのエラーも豊富にあってエラー処理も結構楽
      // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
      throw new NotFoundException();
    }
    return result;
  }
}
