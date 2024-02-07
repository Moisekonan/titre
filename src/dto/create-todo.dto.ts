import { IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'La longueur maximale est de 15 caractères.' })
  title: string;

  @IsNotEmpty()
  description: string;

  status: TodoStatus;

  @IsOptional()
  @IsDate()
  createdAt: Date;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
}
