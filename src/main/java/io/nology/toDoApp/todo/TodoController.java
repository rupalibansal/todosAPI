package io.nology.toDoApp.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.nology.toDoApp.category.Category;
import io.nology.toDoApp.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("todos")
@CrossOrigin(origins = "*")
public class TodoController {

    @Autowired
    private TodoService todoService;

    // POST /todos
    @PostMapping
    public ResponseEntity<Todo> createToDo(@Valid @RequestBody CreateTodoDTO data) throws Exception {
        Todo createdToDo = this.todoService.createToDo(data);
        return new ResponseEntity<Todo>(createdToDo, HttpStatus.CREATED);

    }

    // PUT/PATCH /todos/:id
    @PatchMapping("/{id}")
    public ResponseEntity<Todo> updateToDoById(@PathVariable Long id,
            @Valid @RequestBody UpdateTodoDTO data) throws Exception {
        Optional<Todo> result = this.todoService.updateToDoById(id, data);
        Todo foundTodo = result.orElseThrow(() -> new NotFoundException("Could not find todo with id " + id));
        return new ResponseEntity<>(foundTodo, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> findToDoById(@PathVariable long id) throws NotFoundException {
        Optional<Todo> result = this.todoService.findById(id);
        Todo foundTodo = result.orElseThrow(() -> new NotFoundException("Could not find todo with id" + id));
        return new ResponseEntity<>(foundTodo, HttpStatus.OK);
    }

    // GET /todos?category={category}
    @GetMapping
    public ResponseEntity<List<Todo>> findTodosByCategory(
            @RequestParam(name = "category", required = false) String category) {
        if (category == null) {
            // If no categoryId is provided, return all todos
            List<Todo> todos = this.todoService.findAllByIsArchived();
            return new ResponseEntity<List<Todo>>(todos, HttpStatus.OK);
        } else {
            // If categoryId is provided, return todos filtered by category
            List<Todo> todosByCategory = this.todoService.findTodosByCategory(category);
            return new ResponseEntity<List<Todo>>(todosByCategory, HttpStatus.OK);
        }
    }

    // DELETE /todos/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) throws NotFoundException {
        boolean deleteSuccessful = this.todoService.deleteById(id);
        if (deleteSuccessful == false) {
            throw new NotFoundException("Could not find blog post with id " + id);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
