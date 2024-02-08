// import {
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CreateTodoDto } from 'src/dto/create-todo.dto';
// import { TodoEntity, TodoStatus } from 'src/entities/todo.entity';
// import { UserEntity } from 'src/entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class TodosService {
//   constructor(
//     @InjectRepository(TodoEntity)
//     private todoRepository: Repository<TodoEntity>,
//   ) {}

//   async getAllTodos(user: UserEntity) {
//     const query = this.todoRepository.createQueryBuilder('todo');
//     query.where(`todo.userId = :userId`, { userId: user.id });

//     try {
//       return await query.getMany();
//     } catch (error) {
//       console.log(error.stack);
//       throw new NotFoundException('No todo found');
//     }
//   }

//   async createTodo(
//     createNewTodo: CreateTodoDto,
//     user: UserEntity,
//   ): Promise<TodoEntity> {
//     const todo = new TodoEntity();
//     const { title, description } = createNewTodo;
//     todo.title = title;
//     todo.description = description;
//     todo.status = TodoStatus.OPEN;
//     todo.userId = user.id;

//     // this.todoRepository.create(todo);

//     try {
//       return await this.todoRepository.save(todo);
//     } catch (error) {
//       console.log(error.stack);
//       throw new InternalServerErrorException(
//         "Erreur lors de la création d'une tâche. Veuillez réessayer.",
//       );
//     }
//   }

//   async updateTodo(id: number, status: TodoStatus, user: UserEntity) {
//     try {
//       await this.todoRepository.update({ id, userId: user.id }, { status });
//       return this.todoRepository.findOne({ where: { id } });
//     } catch (error) {
//       throw new InternalServerErrorException(
//         'Erreur lors de la mise à jour des tâches. Veuillez réessayer.',
//       );
//     }
//   }

//   async deleteTodo(id: number, user: UserEntity) {
//     const result = await this.todoRepository.delete({ id, userId: user.id });

//     if (result.affected === 0) {
//       throw new NotFoundException('Todo not deleted');
//     } else {
//       return { success: true };
//     }
//   }
// }

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { TodoEntity, TodoStatus } from 'src/entities/todo.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async getAllTodos(user: UserEntity, status?: string) {
    try {
      const where = { user };
      if (status) {
        where['status'] = status;
      }
      const data = await this.todoRepository.find({ where });

      return { data: data, message: 'success', total: data.length };
    } catch (error) {
      console.log(error.stack);
      throw new NotFoundException('No todo found');
    }
  }

  async createTodo(
    createNewTodo: CreateTodoDto,
    user: UserEntity,
  ): Promise<TodoEntity> {
    const todo = new TodoEntity();
    const { title, description, status } = createNewTodo;
    todo.title = title;
    todo.description = description;
    todo.status = status;
    todo.user = user;

    try {
      return await this.todoRepository.save(todo);
    } catch (error) {
      console.log(error.stack);
      throw new InternalServerErrorException(
        "Erreur lors de la création d'une tâche. Veuillez réessayer.",
      );
    }
  }

  async updateTodo(id: number, status: TodoStatus, user: UserEntity) {
    try {
      await this.todoRepository.update({ id, user }, { status });
      return this.todoRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour des tâches. Veuillez réessayer.',
      );
    }
  }

  async deleteTodo(id: number, user: UserEntity) {
    const result = await this.todoRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException('Todo not deleted');
    } else {
      return { success: true };
    }
  }
}
