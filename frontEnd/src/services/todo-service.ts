const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface TodoItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  archived: boolean;
  completed: boolean;
  category: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
}

export interface ToDoPayload {
  name: string;
  categoryId: number;
}

const getAllTodos = async () => {
  const response = await fetch(`${baseURL}/todos`);
  return response.json() as Promise<TodoItem[]>;
};

const createTodo = async (todo: ToDoPayload) => {
  const response = await fetch(`${baseURL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json() as Promise<TodoItem>;
};

const updateTodo = async (id: number, todo: TodoItem) => {
  const response = await fetch(`${baseURL}/todos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json() as Promise<TodoItem>;
};

const deleteTodo = async (id: number) => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to Delete");
  }
  return true;
};

const getTodoByCategory = async (category: string) => {
  const response = await fetch(`${baseURL}/todos?category=${category}`);
  return response.json() as Promise<TodoItem[]>;
};

export { getAllTodos, createTodo, updateTodo, deleteTodo, getTodoByCategory };
