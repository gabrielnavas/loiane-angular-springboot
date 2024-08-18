package io.github.gabrielnavas.api.category;

import io.github.gabrielnavas.api.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final CategoryRepository categoryRepository;

    public CategoryResponse map(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

    public Category map(String categoryName) {
        Optional<Category> optionalCategory = categoryRepository.findByName(categoryName);
        if (optionalCategory.isEmpty()) {
            throw new EntityNotFoundException("category", "name", categoryName);
        }
        return optionalCategory.get();
    }

    public List<CategoryResponse> map(List<Category> categories) {
        return categories.stream().map(this::map).toList();
    }
}
