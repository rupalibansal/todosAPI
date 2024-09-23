import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/category-service";

export const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const handleOnSubmit = async (data: any) => {
    createCategory(data)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1 style={{ color: "#333" }}>Add a new category</h1>
    </div>
  );
};
