'use client';

import { useTodos } from '../app/hooks/useTodos';
import { Checkbox } from '@/components/ui/checkbox';
import { EditTaskComponent } from '@/components/EditTaskComponent';
import { Button } from '@/components/ui/button';
import { Check, Dot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EditTodoType } from '@/types/todo-types';

export default function Tasks() {
  const {
    isLoading,
    error,
    data,
    deleteMutation,
    handleCompleteTask,
    loading,
    setLoading,
  } = useTodos();

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      {(!data?.data || data.data.length === 0) && (
        <div>
          <p>No Tasks available</p>
        </div>
      )}
      {data?.data &&
        data.data.map((item: EditTodoType, index: number) => (
          <div
            key={index}
            className="card transition-all m-3 bg-white dark:bg-[#23202A] border border-neutral-300 w-[90%] mx-auto p-2 px-5 rounded-lg flex items-center justify-between gap-5"
          >
            <div className="flex items-center gap-3">
              <div
                onClick={() => handleCompleteTask(item?.id, !item?.completed)}
                className={cn(
                  'rounded-full border border-indigo-600 p-[3px] flex items-center cursor-pointer',
                  item.completed && 'bg-indigo-600'
                )}
              >
                {item.completed ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Dot className="h-4 w-4 text-indigo-500" />
                )}
              </div>
              <div className="flex flex-col gap-0 items-start">
                <p
                  className={cn(
                    'font-semibold font-sans',
                    item.completed && 'line-through'
                  )}
                >
                  {item.title}
                </p>
                <p
                  className={cn(
                    'text-sm font-sans',
                    item.completed && 'line-through'
                  )}
                >
                  {item.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditTaskComponent todo={item} />
              <Button
                className="bg-white outline-none dark:bg-[#23202A] border border-red-400 rounded-full text-xs text-red-500 px-2 py-1 h-auto"
                onClick={() => {
                  setLoading(true);
                  deleteMutation.mutate(item.id);
                }}
              >
                {'Delete'}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
