package io.github.gabrielnavas.api.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CourseRequest(

        @NotBlank(message = "name is required")
        @Size(min = 2, max = 100, message = "name must have a minimum of 2 characters and a maximum of 100 characters")
        String name,

        @NotBlank(message = "category is required")
        @Size(min = 2, max = 100, message = "category must have a minimum of 2 characters and a maximum of 100 characters")
        @Pattern(regexp = "back-end|front-end", message = "category must be 'back-end' or 'front-end'")
        String category
) {
}
