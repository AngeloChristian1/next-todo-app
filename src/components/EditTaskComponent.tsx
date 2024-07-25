'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditTodo } from '@/app/hooks/useTodos';

interface TodoProps {
  todo?: {
    title: string;
    description: string;
    id: number;
    userId: number | string;
  };
}

export const EditTaskComponent: React.FC<TodoProps> = props => {
  const { title, setTitle, description, setDescription, handleSubmit } =
    useEditTodo(props.todo);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white dark:bg-[#23202A] border border-blue-400 rounded-full text-xs text-blue-500 px-2 py-1 h-auto"
        >
          <p>Edit Task</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Task Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="items-start flex justify-start">
          <Button type="button" onClick={handleSubmit} className="self-start">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
