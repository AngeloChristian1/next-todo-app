import axios from 'axios';
import { EditTodoType } from '@/types/todo-types';

export const getAllTodos = async () => {
  try {
    const response = await axios.get(`api/todos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneTodo = async (todoId: number) => {
  try {
    const response = await axios.get(`api/todos?id=${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    const response = await axios.delete(`api/todos?id=${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async ({
  todoId,
  data,
}: {
  todoId: number;
  data: EditTodoType;
}) => {
  try {
    const response = await axios.put(`api/todos?id=${todoId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async ({
  id,
  data,
}: {
  id: number;
  data: EditTodoType;
}) => {
  try {
    const response = await axios.post(`/api/todos`, { data });
    console.log('data', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completeTask = async ({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) => {
  try {
    const response = await axios.put(`/api/todos?id=${id}`, { completed });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (todo: {
  title: string;
  description: string;
  completed: boolean;
  userId?: number | string;
}) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json();
};

export const editTodo = async ({
  id,
  data,
}: {
  id: number | string | undefined;
  data: { title: string; description: string; userId: string | undefined };
}) => {
  try {
    const response = await fetch(`/api/todos?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to edit todo');
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};
