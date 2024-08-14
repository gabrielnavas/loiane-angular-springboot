package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.lesson.LessonResponse;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record CourseResponse(
        UUID id,
        String name,
        String category,
        List<LessonResponse> lessons
) {
}
