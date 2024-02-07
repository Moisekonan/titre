import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TodoStatus } from '../entities/todo.entity';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TodoStatus.OPEN,
    TodoStatus.WIP,
    TodoStatus.COMPLETED,
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} est un statut invalide.`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }
}
