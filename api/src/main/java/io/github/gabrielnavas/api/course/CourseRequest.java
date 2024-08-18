package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.lesson.LessonRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record CourseRequest(

        @NotBlank(message = "name is required")
        @Size(min = 2, max = 100, message = "name must have a minimum of 2 characters and a maximum of 100 characters")
        String name,

        @NotNull(message = "category is required")
        UUID categoryId,

        @NotEmpty(message = "lessons is required")
        List<LessonRequest> lessons
) {
}
