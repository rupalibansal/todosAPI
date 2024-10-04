import { baseURL } from "../config/config";
interface todo {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  archived: boolean;
  completed: boolean;
}

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  todos: todo[];
}

export interface CategoryPayload {
  name: string;
}

const getAllCategories = async () => {
  const response = await fetch(`${baseURL}/categories`);
  return response.json() as Promise<Category[]>;
};

const createCategory = async (category: CategoryPayload) => {
  const response = await fetch(`${baseURL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return response.json() as Promise<Category>;
};

const updateCategoryById = async (id: number, category: Category) => {
  const response = await fetch(`${baseURL}/categories/${category.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return response.json() as Promise<Category>;
};

const deleteCategoryById = async (id: number) => {
  const response = await fetch(`${baseURL}/categories/${id}`, {
    method: "DELETE",
  });
  return response.json() as Promise<void>;
};

export {
  getAllCategories,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
