import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";

interface TodoCardProps {
  todo: { id: number; name: string };
  onDelete: (id: number) => Promise<unknown>;
  onDuplicate: (id: number) => Promise<void>;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete, onDuplicate }) => {
  const handleDelete = async () => {
    await onDelete(todo.id);
  };

  const handleDuplicate = async () => {
    await onDuplicate(todo.id);
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component="h2">
              {todo.name}
            </Typography>
          </Box>
          <Box>
            <IconButton
              edge="end"
              aria-label="delete"
              color="error"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="duplicate"
              onClick={handleDuplicate}
              sx={{ color: "#e6842e" }} // Light blue color
            >
              <FileCopyIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
