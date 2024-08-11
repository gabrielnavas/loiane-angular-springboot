package io.github.gabrielnavas.api.course;

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
        try {
            CourseResponse courseResponse = courseService.get(courseId);
            return ResponseEntity.ok(courseResponse);
        } catch (RuntimeException ex) {
            if (ex.getMessage().equals("course not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<CourseResponse> save(
            @RequestBody CourseRequest request
    ) {
        CourseResponse courseResponse = courseService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(courseResponse);
    }

    @PatchMapping("/{course-id}")
    public ResponseEntity<CourseResponse> partialUpdate(
            @PathVariable("course-id") UUID courseId,
            @RequestBody CourseRequest request
    ) {
        try {
            courseService.partialUpdate(courseId, request);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException ex) {
            if (ex.getMessage().equals("course not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{course-id}")
    public ResponseEntity<CourseResponse> delete(
            @PathVariable("course-id") UUID courseId
    ) {
        try {
            courseService.delete(courseId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException ex) {
            if (ex.getMessage().equals("course not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.internalServerError().build();
        }
    }
}
