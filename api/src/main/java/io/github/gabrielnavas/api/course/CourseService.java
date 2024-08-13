package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.category.Category;
import io.github.gabrielnavas.api.category.CategoryRepository;
import io.github.gabrielnavas.api.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final CourseMapper courseMapper;

    public void partialUpdate(UUID courseId, CourseRequest request) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        Optional<Category> optionalCategory = categoryRepository.findByName(request.category());
        if (optionalCategory.isEmpty()) {
            throw new EntityNotFoundException("category", "name", request.category());
        }

        Course course = optionalCourse.get();
        course.setName(request.name());
        course.setCategory(optionalCategory.get());

        courseRepository.save(course);
    }

    public CourseResponse save(CourseRequest request) {
        Optional<Category> optionalCategory = categoryRepository.findByName(request.category());
        if (optionalCategory.isEmpty()) {
            throw new EntityNotFoundException("category", "name", request.category());
        }

        Course course = courseMapper.map(request, optionalCategory.get());
        course = courseRepository.save(course);
        return courseMapper.map(course);
    }

    public CourseResponse get(UUID courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        Course course = optionalCourse.get();
        return courseMapper.map(course);
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
                .map(courseMapper::map).toList();
    }
}
