import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { db } from '@/lib/db';
import { todos } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { EditTodoType } from '@/types/todo-types';
import { auth } from '@/auth';

type ResponseData = {
  message: string;
};

type UpdatedTodo = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { title, description, completed }: EditTodoType = await req.json();

    if (!title || !description || completed == null) {
      return new NextResponse(
        JSON.stringify({ name: 'Please provide all required info' }),
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(todos)
      .values({ title: title, description, userId: session?.user.id as string })
      .returning();

    return NextResponse.json(
      { message: 'Task added successfully', todo: inserted },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const session = await auth();
    const allTodos = await db.query.todos.findMany({
      where: (todo, { eq }) => eq(todo.userId, session?.user.id as string),
    });
    return NextResponse.json(
      { message: 'Todos retrieved successfully', data: allTodos },
      { status: 200 }
    );

    if (params.id) {
      const todoId = parseInt(params.id);
      const todo = await db.select().from(todos).where(eq(todos.id, todoId));
      return NextResponse.json(
        { message: 'Todo retrieved successfully', data: todo },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const todoId = parseInt(searchParams.get('id') || '', 10);

    if (isNaN(todoId)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const todo = await db.query.todos.findFirst({
      where: (todo, { eq }) => eq(todo.id, todoId),
    });

    if (!todo) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    const body: UpdatedTodo = await req.json();

    const updatedTodo = await db
      .update(todos)
      .set({
        title: body.title ?? todo.title,
        description: body.description ?? todo.description,
        completed: body.completed ?? todo.completed,
      })
      .where(eq(todos.id, todoId))
      .returning();

    return NextResponse.json({
      message: 'Todo updated successfully',
      todo: updatedTodo,
    });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const todoId = parseInt(searchParams.get('id') || '', 10);

    if (isNaN(todoId)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const todo = await db.query.todos.findFirst({
      where: (todo, { eq }) => eq(todo.id, todoId),
    });

    if (todo) {
      const deletedTodo = await db
        .delete(todos)
        .where(eq(todos.id, todoId))
        .returning();
      return NextResponse.json({
        message: `Todo ${todoId} has been deleted`,
        deletedTodo,
      });
    }

    return NextResponse.json(
      { message: `Todo ${todoId} not found` },
      { status: 404 }
    );
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
