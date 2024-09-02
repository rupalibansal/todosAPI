package io.nology.toDoApp.todo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTodoDTO {
    @NotBlank
    private String name;
    @NotNull
    private Long categoryId;

    public String getName() {
        return name;
    }

    public Long getCategoryId() {
        return categoryId;
    }

}
