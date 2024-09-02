package io.nology.toDoApp.todo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.toDoApp.category.Category;
import io.nology.toDoApp.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "toDos")
public class Todo extends BaseEntity {

    public Todo() {
    }

    @Column
    private String name;

    @Column(columnDefinition = "boolean default false")
    private boolean isArchived;

    @Column(columnDefinition = "boolean default false")
    private boolean isCompleted;

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean isArchived) {
        this.isArchived = isArchived;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("todos")
    private Category category;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
