import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addTodo,
  completeTask,
  deleteTodo,
  editTodo,
  getAllTodos,
} from '../actions/todoActions';
import { EditTodoType } from '@/types/todo-types';
import { useSession } from 'next-auth/react';

export function useTodos() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({ description: 'Task Deleted Successfully' });
      setLoading(false);
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({ description: 'Task Updated Successfully' });
    },
  });

  const handleCompleteTask = (id: number, completed: boolean) => {
    completeMutation.mutate({ id, completed });
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        description: 'Task Added Successfully',
        popover: 'manual',
        title: 'Task Complete',
      });
      setTitle('');
      setDescription('');
    },
    scope: {
      id: 'todos',
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      title,
      description,
      completed: false,
      userId: session?.user?.id,
    });
  };

  return {
    isLoading,
    error,
    data,
    deleteMutation,
    handleCompleteTask,
    loading,
    setLoading,
    handleSubmit,
    title,
    setTitle,
    description,
    setDescription,
  };
}

export function useEditTodo(todo?: {
  title: string;
  description: string;
  id: number;
  userId: number | string;
}) {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const { data: session } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({ description: 'Task Edited Successfully' });
      setTitle('');
      setDescription('');
    },
    scope: {
      id: 'todos',
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      id: todo?.id,
      data: { title, description, userId: session?.user?.id },
    });
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    handleSubmit,
  };
}
