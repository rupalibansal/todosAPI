const baseURL =
  "http://ec2-3-24-134-69.ap-southeast-2.compute.amazonaws.com:8080";

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
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as TodoItem[];
};

const createTodo = async (todo: ToDoPayload) => {
  const response = await fetch(`${baseURL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to create a todo");
  }
  return (await response.json()) as TodoItem;
};

const updateTodo = async (id: number, todo: ToDoPayload) => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return (await response.json()) as TodoItem;
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
  if (!response.ok) {
    throw new Error("Failed to get todos by category");
  }
  return (await response.json()) as TodoItem[];
};

export const getTodoById = async (id: number) => {
  const response = await fetch(baseURL + "/todos/" + id);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as TodoItem;
};

export { getAllTodos, createTodo, updateTodo, deleteTodo, getTodoByCategory };
