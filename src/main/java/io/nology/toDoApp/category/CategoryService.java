package io.nology.toDoApp.category;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repo;

    @Autowired
    private ModelMapper mapper;

    public Category createCategory(@Valid CreateCategoryDTO data) throws Exception {
        String formattedName = data.getName().trim().toLowerCase();
        if (repo.existsByName(formattedName)) {
            throw new Exception("category name exists");
        }
        Category newCategory = mapper.map(data, Category.class);
        return this.repo.save(newCategory);
    }

    public List<Category> findAll() {
        return this.repo.findAll();

    }

    public Optional<Category> updateCategoryById(Long id, @Valid UpdateCategoryDTO data) throws Exception {
        Optional<Category> result = this.repo.findById(id);
        if (result.isEmpty()) {
            throw new Exception(data.getCategoryId().toString());
        }
        Category categoryToUpdate = result.get();
        categoryToUpdate.setName(data.getName());

        Category updatedCategory = this.repo.save(categoryToUpdate);
        return Optional.of(updatedCategory);
    }

    public boolean deleteById(Long id) {
        this.repo.deleteById(id);
        return !this.repo.existsById(id);
    }

    public Optional<Category> findById(Long id) {
        return this.repo.findById(id);
    }

}
