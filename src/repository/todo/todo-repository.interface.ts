import { Todo } from 'src/models/todo.model';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo>;
  create(data: Partial<Todo>): Promise<Todo>;
  update(id: string, data: Partial<Todo>): Promise<Todo>;
  delete(id: string): Promise<Todo>;
}
