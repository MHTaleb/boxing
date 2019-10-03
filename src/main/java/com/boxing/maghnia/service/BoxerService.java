package com.boxing.maghnia.service;

import com.boxing.maghnia.domain.Boxer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Boxer}.
 */
public interface BoxerService {

    /**
     * Save a boxer.
     *
     * @param boxer the entity to save.
     * @return the persisted entity.
     */
    Boxer save(Boxer boxer);

    /**
     * Get all the boxers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Boxer> findAll(Pageable pageable);


    /**
     * Get the "id" boxer.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Boxer> findOne(Long id);

    /**
     * Delete the "id" boxer.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
