package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.category.Category;
import io.github.gabrielnavas.api.category.CategoryRepository;
import io.github.gabrielnavas.api.exception.EntityNotFoundButShouldBeException;
import io.github.gabrielnavas.api.exception.EntityNotFoundException;
import io.github.gabrielnavas.api.lesson.Lesson;
import io.github.gabrielnavas.api.lesson.LessonMapper;
import io.github.gabrielnavas.api.lesson.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final LessonRepository lessonRepository;
    private final LessonMapper lessonMapper;
    private final CourseMapper courseMapper;

    @Transactional
    public void partialUpdate(UUID courseId, CourseRequest request) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        Optional<Category> optionalCategory = categoryRepository.findById(request.categoryId());
        if (optionalCategory.isEmpty()) {
            final List<Category> categories = categoryRepository.findAll();
            throw new EntityNotFoundButShouldBeException("category", "id", request.categoryId().toString(), categories.stream().map(Category::getName).toList());
        }

        Course course = optionalCourse.get();

        List<Lesson> lessonsToDelete = course.getLessons();
        lessonRepository.deleteAll(lessonsToDelete);
        course.clearLessons();

        course.setName(request.name());
        course.setCategory(optionalCategory.get());
        course.addLessons(request.lessons().stream().map(lessonMapper::map).toList());
        course.setUpdatedAt(LocalDateTime.now());

        courseRepository.save(course);
    }

    @Transactional
    public CourseResponse save(CourseRequest request) {
        Optional<Category> optionalCategory = categoryRepository.findById(request.categoryId());
        if (optionalCategory.isEmpty()) {
            final List<Category> categories = categoryRepository.findAll();
            throw new EntityNotFoundButShouldBeException("category", "id", request.categoryId().toString(), categories.stream().map(Category::getName).toList());
        }

        Course course = courseMapper.map(request);
        course.setCreatedAt(LocalDateTime.now());
        course.setCategory(optionalCategory.get());
        course.addLessons(request.lessons().stream().map(lessonMapper::map).toList());

        course = courseRepository.save(course);
        return courseMapper.map(course);
    }

    @Transactional(readOnly = true)
    public CourseResponse get(UUID courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        Course course = optionalCourse.get();
        return courseMapper.map(course);
    }

    @Transactional
    public void delete(UUID courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new EntityNotFoundException("course", "id", courseId.toString());
        }

        courseRepository.deleteById(courseId);
    }

    @Transactional(readOnly = true)
    public CoursePageResponse list(int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt", "updatedAt");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Course> courses = courseRepository.findAll(pageable);
        return courseMapper.map(
                courses.getTotalElements(),
                courses.getTotalPages(),
                courses.stream().toList()
        );

    }
}
