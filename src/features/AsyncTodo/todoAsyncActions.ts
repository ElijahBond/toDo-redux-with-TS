import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from 'types';
import { TodoSlice } from './asyncTodoSlice';

export const fetchAllTodos = createAsyncThunk<
  Todo[],
  undefined,
  { state: { asyncTodos: TodoSlice } }
>(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

    return await response.json();
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().asyncTodos;

      if (status === 'loading') {
        return false;
      }
    },
  },
);

export const createTodo = createAsyncThunk<
  Todo,
  string
>(
  'todo/createTodo',
  async (text) => {
    const newTodo: Required<Omit<Todo, 'id'>> = {
      title: text,
      userId: 1,
      completed: false,
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    return await response.json();
  }
);