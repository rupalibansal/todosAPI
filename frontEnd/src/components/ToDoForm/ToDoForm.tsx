import { useEffect, useState } from "react";
import { Category, getAllCategories } from "../../services/category-service";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface ToDoFormProps {
  initialValues?: { todoName: string; categoryId: number };
  onSubmit: ({
    name,
    categoryId,
  }: {
    name: string;
    categoryId: number;
  }) => Promise<void>;
}

export const ToDoForm = ({ initialValues, onSubmit }: ToDoFormProps) => {
  const [name, setName] = useState(initialValues?.todoName || "");
  const [categoryId, setCategoryId] = useState<number>(
    initialValues?.categoryId || 1
  );
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    setCategoryId(event.target.value as number);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input
    if (name.trim() === "") {
      alert("Please enter a valid name");
      return;
    }

    // Call onSubmit function with name and category
    try {
      await onSubmit({ name, categoryId });
      setName("");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <TextField
        label="Todo Name"
        variant="outlined"
        value={name}
        onChange={handleInputChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={categoryId}
          onChange={handleCategoryChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        sx={{
          fontSize: "1.2em",
          backgroundColor: "#4CAF50", // Custom green color
          color: "white",
          "&:hover": {
            backgroundColor: "#45a049", // Darker green on hover
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};
