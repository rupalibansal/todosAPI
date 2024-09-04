import { useNavigate } from "react-router-dom";
import { createTodo, ToDoPayload } from "../../services/todo-service";
import { ToDoForm } from "../../components/ToDoForm/ToDoForm";

export const CreateToDoPage = () => {
  const navigate = useNavigate();
  const handleOnSubmit = async (data: ToDoPayload) => {
    createTodo(data)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1 style={{ color: "#333" }}>Plan Your Next Task</h1>
      <ToDoForm onSubmit={handleOnSubmit} />
    </div>
  );
};
