import { useNavigate, useParams } from "react-router-dom";
import { ToDoForm } from "../../components/ToDoForm/ToDoForm";
import {
  getTodoById,
  TodoItem,
  ToDoPayload,
  updateTodo,
} from "../../services/todo-service";
import { useEffect, useState } from "react";

export const EditToDoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const [todo, setTodo] = useState<TodoItem>();
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const idNumber = parseInt(id);
  const handleOnSubmit = async (data: ToDoPayload) => {
    updateTodo(idNumber, data as ToDoPayload)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getTodoById(Number(id))
      .then((data) => {
        setTodo(data);
        setIsDataAvailable(true);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <div>
      <h1 style={{ color: "#333" }}>Edit your Task</h1>
      {isDataAvailable && (
        <ToDoForm
          onSubmit={handleOnSubmit}
          initialValues={{
            todoName: todo?.name,
            categoryId: todo?.category.id,
          }}
        />
      )}
    </div>
  );
};
