import {
  Body,
  Param,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, TodoStatus } from 'src/dto/create-todo.dto';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidator.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  getTodos(@User() user: UserEntity, @Query('status') status: string) {
    return this.todoService.getAllTodos(user, status);
  }

  @Post()
  createNewTodo(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @User() user: UserEntity) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Put('/:id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.todoService.updateTodo(id, status, user);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: number, @User() user: UserEntity){
    return this.todoService.deleteTodo(id, user);
  }
}
