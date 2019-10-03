package com.boxing.maghnia.service.impl;

import com.boxing.maghnia.service.LessonService;
import com.boxing.maghnia.domain.Lesson;
import com.boxing.maghnia.repository.LessonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Lesson}.
 */
@Service
@Transactional
public class LessonServiceImpl implements LessonService {

    private final Logger log = LoggerFactory.getLogger(LessonServiceImpl.class);

    private final LessonRepository lessonRepository;

    public LessonServiceImpl(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    /**
     * Save a lesson.
     *
     * @param lesson the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Lesson save(Lesson lesson) {
        log.debug("Request to save Lesson : {}", lesson);
        return lessonRepository.save(lesson);
    }

    /**
     * Get all the lessons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Lesson> findAll(Pageable pageable) {
        log.debug("Request to get all Lessons");
        return lessonRepository.findAll(pageable);
    }

    /**
     * Get all the lessons with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Lesson> findAllWithEagerRelationships(Pageable pageable) {
        return lessonRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one lesson by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Lesson> findOne(Long id) {
        log.debug("Request to get Lesson : {}", id);
        return lessonRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the lesson by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Lesson : {}", id);
        lessonRepository.deleteById(id);
    }
}
