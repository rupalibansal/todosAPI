package io.nology.toDoApp.todo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.toDoApp.category.Category;
import io.nology.toDoApp.category.CategoryService;
import io.nology.toDoApp.common.ValidationErrors;
import io.nology.toDoApp.common.exceptions.ServiceValidationException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import jakarta.validation.Valid;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapper mapper;

    public List<Todo> findAllByIsArchived() {
        return todoRepository.findAllByIsArchived(false);
    }

    public Todo createToDo(@Valid CreateTodoDTO data) throws ServiceValidationException {

        ValidationErrors errors = new ValidationErrors();
        // Todo newToDo = mapper.map(data, Todo.class);
        Todo newToDo = new Todo();
        newToDo.setName(data.getName());
        Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

        if (categoryResult.isEmpty()) {
            errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
        } else {
            newToDo.setCategory(categoryResult.get());
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        // String formattedName = data.getName().trim().toLowerCase();
        // if (todoRepository.existsByName(formattedName)) {
        // throw new IllegalArgumentException("Todo with name " + formattedName + "
        // already exists");
        // }
        return this.todoRepository.save(newToDo);
    }

    public Optional<Todo> updateToDoById(Long id, @Valid UpdateTodoDTO data) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setName(data.getName());

            Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());
            if (categoryResult.isEmpty()) {
                throw new IllegalArgumentException("Category with id " + data.getCategoryId() + " does not exist");
            } else {
                todo.setCategory(categoryResult.get());
            }
            return Optional.of(todoRepository.save(todo));
        } else {
            return Optional.empty();
        }
    }

    public List<Todo> findTodosByCategory(String category) {

        return todoRepository.findTodosByCategory(category);

    }

    public boolean deleteById(Long id) {

        // get the todo with id from the repository
        Optional<Todo> todo = todoRepository.findById(id);
        // if the todo exists, set the isArchived property to true
        if (todo.isPresent()) {
            Todo todoToArchive = todo.get();
            todoToArchive.setArchived(true);
            todoRepository.save(todoToArchive);
        }

        return todo.isPresent();
    }

    public Optional<Todo> findById(Long id) {
        return this.todoRepository.findById(id);
    }
}
