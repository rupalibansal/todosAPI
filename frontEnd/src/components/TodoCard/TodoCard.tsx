import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditIcon from "@mui/icons-material/Edit";
import { getCategoryColor } from "../../utils/utils";

interface TodoCardProps {
  todo: { id: number; name: string; category: { id: number; name: string } };
  onDelete: (id: number) => Promise<unknown>;
  onDuplicate: (id: number) => Promise<void>;
  onEdit: (id: number) => Promise<void>;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onDelete,
  onDuplicate,
  onEdit,
}) => {
  const handleDelete = async () => {
    await onDelete(todo.id);
  };

  const handleDuplicate = async () => {
    await onDuplicate(todo.id);
  };

  const handleEdit = async () => {
    await onEdit(todo.id);
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
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Typography variant="h6" component="h2">
              {todo.name}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                backgroundColor: getCategoryColor(todo.category.name),
                color: "white",
                padding: "2px 8px",
                borderRadius: "12px",
                display: "inline-block",
                marginLeft: 1,
              }}
            >
              <Typography variant="subtitle2" component="h2">
                {todo.category.name}
              </Typography>
            </Box>
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
            <IconButton edge="end" aria-label="edit">
              <EditIcon onClick={handleEdit} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
