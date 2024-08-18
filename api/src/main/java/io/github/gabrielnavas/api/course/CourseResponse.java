package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.category.CategoryResponse;
import io.github.gabrielnavas.api.lesson.LessonResponse;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record CourseResponse(
        UUID id,
        String name,
        CategoryResponse category,
        List<LessonResponse> lessons
) {
}
