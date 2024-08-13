package io.github.gabrielnavas.api.course;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseResponse>> list(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        List<CourseResponse> courses = courseService.list(page, size);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{course-id}")
    public ResponseEntity<CourseResponse> getById(
            @PathVariable("course-id") UUID courseId
    ) {
        CourseResponse courseResponse = courseService.get(courseId);
        return ResponseEntity.ok(courseResponse);
    }

    @PostMapping
    public ResponseEntity<CourseResponse> save(
            @RequestBody @Valid CourseRequest request
    ) {
        CourseResponse courseResponse = courseService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(courseResponse);
    }

    @PatchMapping("/{course-id}")
    public ResponseEntity<CourseResponse> partialUpdate(
            @PathVariable("course-id") UUID courseId,
            @RequestBody @Valid CourseRequest request
    ) {
        courseService.partialUpdate(courseId, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{course-id}")
    public ResponseEntity<CourseResponse> delete(
            @PathVariable("course-id") UUID courseId
    ) {
        courseService.delete(courseId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
