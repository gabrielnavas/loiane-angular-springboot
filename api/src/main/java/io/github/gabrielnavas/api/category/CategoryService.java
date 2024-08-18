package io.github.gabrielnavas.api.category;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> list(int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "name");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Category> categories = categoryRepository.findAll(pageable);
        return categoryMapper.map(categories.stream().toList());
    }
}
