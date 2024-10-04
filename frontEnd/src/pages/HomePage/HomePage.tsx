import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  TodoItem,
} from "../../services/todo-service";
import { createCategory } from "../../services/category-service";
import { Todo } from "../../components/Todo/Todo";
import "./HomePage.css";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { getCategoryColor } from "../../utils/utils";

export const HomePage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getAllTodos()
      .then((data) => setTodos(data))
      .catch((e) => console.log(e));
  }, []);

  const navigate = useNavigate();

  const handleCreateTodo = () => {
    navigate("/todo/new");
  };

  const handleCreateCategory = () => {
    setIsCreateCategoryModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateCategoryModalOpen(false);
  };

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Category Name:", categoryName);
    setIsCreateCategoryModalOpen(false);
    createCategory({ name: categoryName });
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) {
      return;
    }
    const isDeleted = await deleteTodo(id).catch((e) => {
      console.log(e);
      return false;
    });

    if (isDeleted) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category.name === selectedCategory)
    : todos;

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const uniqueCategories = Array.from(
    new Set(todos.map((todo) => todo.category.name))
  );

  const handleDuplicate = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    const newTodo = await createTodo({
      name: `${todo.name}`,
      categoryId: todo.category.id,
    }).catch((e) => {
      console.log(e);
      return null;
    });
    if (newTodo) {
      setTodos([newTodo, ...todos]);
    }
  };

  const handleEdit = async (id: number) => {
    navigate("/todo/edit/" + id);
  };

  return (
    <div className="container">
      <h1 className="highlighted-heading">Welcome to todos app!</h1>
      <div>
        <button
          className="create-todo-button"
          onClick={handleCreateTodo}
          style={{ marginRight: "10px" }}
        >
          Create Todo
        </button>
        <button className="create-todo-button" onClick={handleCreateCategory}>
          Create Category
        </button>
      </div>

      <Modal isOpen={isCreateCategoryModalOpen} onClose={handleModalClose}>
        <h2 className="modal-header">Create Category</h2>
        <form onSubmit={handleCategorySubmit}>
          <input
            type="text"
            placeholder="Enter Category Name"
            id="categoryName"
            className="modal-input"
            value={categoryName}
            onChange={handleCategoryNameChange}
            required
          />
          <button type="submit" className="modal-submit-button">
            Submit
          </button>
        </form>
      </Modal>

      <div className="category-pills">
        <Box
          sx={{
            backgroundColor: "#9e9e9e", // Grey for "All" category
            color: "white",
            padding: "2px 8px",
            borderRadius: "12px",
            display: "inline-block",
            margin: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleCategoryClick(null)}
        >
          <Typography variant="subtitle2" component="span">
            All
          </Typography>
        </Box>
        {uniqueCategories.map((category) => (
          <Box
            key={category}
            sx={{
              backgroundColor: getCategoryColor(category),
              color: "white",
              padding: "2px 8px",
              borderRadius: "12px",
              display: "inline-block",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick(category)}
          >
            <Typography variant="subtitle2" component="span">
              {category}
            </Typography>
          </Box>
        ))}
      </div>

      <div className="todo-container">
        <Todo
          todos={filteredTodos}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};
