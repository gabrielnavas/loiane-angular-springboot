package io.github.gabrielnavas.api.lesson;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LessonRequest(
        @NotBlank(message = "name is required")
        @Size(min = 2, max = 100, message = "name must have a minimum of 2 characters and a maximum of 150 characters")
        String name,

        @NotBlank(message = "category is required")
        @Size(min = 1, max = 11, message = "category must have a minimum of 1 characters and a maximum of 11 characters")
        String youtubeUrl
) {
}
