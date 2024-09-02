package io.nology.toDoApp.category;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

public class UpdateCategoryDTO {
    @Pattern(regexp = ".*\\S.*", message = "Category Name cannot be empty")
    @Length(min = 5)
    private String name;

    @Min(1)
    private Long categoryId;

    public String getName() {
        return name;
    }

    public Long getCategoryId() {
        return categoryId;
    }
}
