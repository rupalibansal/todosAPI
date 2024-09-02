package io.nology.toDoApp.todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    boolean existsByName(String name);

    // write a query to find all todos that are archived
    @Query("select t from Todo t where t.isArchived = false")
    List<Todo> findAllByIsArchived(boolean isArchived);

    // write a query to find todo by category

    @Query("select t from Todo t where t.category.name = :category")
    List<Todo> findTodosByCategory(String category);

}
