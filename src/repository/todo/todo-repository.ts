import { Injectable } from '@nestjs/common';
import { ITodoRepository } from './todo-repository.interface';
import { Todo } from '../../models/todo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoRepositoryImpl implements ITodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  
  async findAll(): Promise<Todo[]> {
    return [];
  }

  async findById(id: string): Promise<Todo> {
    return {} as Todo;
  }

  async create(data: Partial<Todo>): Promise<Todo> {
    return {} as Todo;
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    return {} as Todo;
  }

  async delete(id: string): Promise<Todo> {
    return {} as Todo;
  }
}
