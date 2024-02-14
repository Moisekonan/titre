import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';


export enum TodoStatus {
  OPEN = 'OPEN',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}
export class CreateTodoDto {

  @ApiProperty({
    description: 'Le titre de la tâche.',
    example: 'Faire les courses',
  })
  @IsNotEmpty()
  @MaxLength(15, { message: 'La longueur maximale est de 15 caractères.' })
  title: string;

  @ApiProperty({
    description: 'La description de la tâche.',
    example: 'Acheter du lait, des oeufs et du pain.',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Le status de la tâche.',
    example: 'OPEN',
  })
  @IsNotEmpty()
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @ApiProperty({
    description: 'La date de création de la tâche.',
    example: '2021-07-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'La date de mise à jour de la tâche.',
    example: '2021-07-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
