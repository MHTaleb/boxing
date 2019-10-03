package com.boxing.maghnia.service;

import com.boxing.maghnia.domain.Trainer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Trainer}.
 */
public interface TrainerService {

    /**
     * Save a trainer.
     *
     * @param trainer the entity to save.
     * @return the persisted entity.
     */
    Trainer save(Trainer trainer);

    /**
     * Get all the trainers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Trainer> findAll(Pageable pageable);


    /**
     * Get the "id" trainer.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Trainer> findOne(Long id);

    /**
     * Delete the "id" trainer.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
