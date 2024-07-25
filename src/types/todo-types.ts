export interface EditTodoType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

export interface ErrorType {
  message: string | unknown;
}
