package io.nology.toDoApp.category;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.toDoApp.common.BaseEntity;
import io.nology.toDoApp.todo.Todo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {

    public Category() {
    }

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "category")
    @JsonIgnoreProperties("category")
    private List<Todo> todos;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        this.todos = todos;
    }

    @Override
    public String toString() {
        return "Category [name=" + name + ", todos=" + todos + "]";
    }
}