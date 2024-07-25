'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodos } from '@/app/hooks/useTodos';

export function AddtaskComponent() {
  const { title, setTitle, description, setDescription, handleSubmit } =
    useTodos();

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm items-center space-x-2 border border-neutral-400 mx-auto p-5 rounded">
      <Input
        type="text"
        placeholder="Task"
        className="dark:text-neutral-300"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        className="dark:text-neutral-300"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <Button type="button" className="w-full mt-5" onClick={handleSubmit}>
        Add Task
      </Button>
    </div>
  );
}
