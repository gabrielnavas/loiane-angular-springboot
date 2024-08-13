package io.github.gabrielnavas.api.category;

import io.github.gabrielnavas.api.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final CategoryRepository categoryRepository;

    public String map(Category category) {
        return category.getName();
    }

    public Category map(String categoryName) {
        Optional<Category> optionalCategory = categoryRepository.findByName(categoryName);
        if (optionalCategory.isEmpty()) {
            throw new EntityNotFoundException("category", "name", categoryName);
        }
        return optionalCategory.get();
    }
}
