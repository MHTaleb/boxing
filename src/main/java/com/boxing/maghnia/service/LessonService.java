package com.boxing.maghnia.service;

import com.boxing.maghnia.domain.Lesson;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.Set;

/**
 * Service Interface for managing {@link Lesson}.
 */
public interface LessonService {

    /**
     * Save a lesson.
     *
     * @param lesson the entity to save.
     * @return the persisted entity.
     */
    Lesson save(Lesson lesson);

    /**
     * Get all the lessons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Lesson> findAll(Pageable pageable);

    /**
     * Get all the lessons with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Lesson> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" lesson.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Lesson> findOne(Long id);

    /**
     * Delete the "id" lesson.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

	Set<Lesson> findAllWithBoxerId(Long id);
}
