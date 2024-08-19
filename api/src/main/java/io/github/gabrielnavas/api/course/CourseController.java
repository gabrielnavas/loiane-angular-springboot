package io.github.gabrielnavas.api.course;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public CoursePageResponse list(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        return courseService.list(page, size);
    }

    @GetMapping("/{course-id}")
    public CourseResponse getById(
            @PathVariable("course-id") UUID courseId
    ) {
        return courseService.get(courseId);
    }

    @PostMapping
    public CourseResponse save(
            @RequestBody @Valid CourseRequest request
    ) {
        return courseService.save(request);
    }

    @PatchMapping("/{course-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void partialUpdate(
            @PathVariable("course-id") UUID courseId,
            @RequestBody @Valid CourseRequest request
    ) {
        courseService.partialUpdate(courseId, request);
    }

    @DeleteMapping("/{course-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable("course-id") UUID courseId
    ) {
        courseService.delete(courseId);
    }
}
