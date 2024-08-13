package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public void partialUpdate(UUID courseId, CourseRequest request) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        Course course = optionalCourse.get();
        course.setName(request.name());
        course.setCategory(request.category());

        courseRepository.save(course);
    }

    public CourseResponse save(CourseRequest request) {
        Course course = Course.builder()
                .name(request.name())
                .category(request.category())
                .createdAt(LocalDateTime.now())
                .status("active")
                .build();
        course = courseRepository.save(course);
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .category(course.getCategory())
                .build();
    }

    public CourseResponse get(UUID courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        Course course = optionalCourse.get();
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .category(course.getCategory())
                .build();
    }

    public void delete(UUID courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        courseRepository.deleteById(courseId);
    }

    public List<CourseResponse> list(int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);
        return courseRepository.findAll(pageable)
                .stream()
                .map(course -> CourseResponse.builder()
                        .id(course.getId())
                        .name(course.getName())
                        .category(course.getCategory())
                        .build()
                ).toList();
    }
}
