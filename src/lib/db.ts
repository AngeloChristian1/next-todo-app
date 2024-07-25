import '@/lib/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { users, todos } from './schema';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

export const getTodos = async () => {
  const results = await db.query.todos.findMany();
  return results;
};

export type NewUser = typeof users.$inferInsert;
export type NewTodo = typeof todos.$inferInsert;

export const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};

export const insertTodo = async (todo: NewTodo) => {
  return db.insert(todos).values(todo).returning();
};

export const getTodos2 = async () => {
  const result = await db.query.todos.findMany();
  return result;
};
