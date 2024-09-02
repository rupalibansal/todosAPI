package io.nology.toDoApp.category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.toDoApp.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // GET /categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> allCategories = this.categoryService.findAll();
        return new ResponseEntity<List<Category>>(allCategories, HttpStatus.OK);
    }

    // POST /categories
    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO data) throws Exception {
        Category newCategory = this.categoryService.createCategory(data);
        return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
    }

    // PUT /categories/:id
    @PatchMapping("/{id}")
    public ResponseEntity<Category> updateCategoryById(@PathVariable Long id,
            @Valid @RequestBody UpdateCategoryDTO data) throws Exception {
        Optional<Category> result = this.categoryService.updateCategoryById(id, data);
        Category foundCategory = result
                .orElseThrow(() -> new NotFoundException("Could not find the category with id" + id));
        return new ResponseEntity<>(foundCategory, HttpStatus.OK);
    }

    // DELETE /categories/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id) throws NotFoundException {
        boolean deleteSuccessful = this.categoryService.deleteById(id);
        if (deleteSuccessful == false) {
            throw new NotFoundException("Could not find category with id" + id);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
