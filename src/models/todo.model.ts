import { User } from "./user.model";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  user: User;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}
