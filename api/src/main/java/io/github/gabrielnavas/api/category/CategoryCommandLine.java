package io.github.gabrielnavas.api.category;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class CategoryCommandLine implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        this.initialCategories();
    }

    private void initialCategories() {
        Stream.of("front-end", "back-end")
                .filter(categoryName -> categoryRepository.findByName(categoryName).isEmpty())
                .forEach(categoryName -> categoryRepository.save(
                        Category.builder().name(categoryName).build()
                ));
    }
}
