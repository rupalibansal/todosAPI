package io.nology.toDoApp.todo;

public class UpdateTodoDTO {
    private String name;
    private Long categoryId;

    public UpdateTodoDTO() {
    }

    public UpdateTodoDTO(String name, Long categoryId) {
        this.name = name;
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public Long getCategoryId() {
        return categoryId;
    }
}
