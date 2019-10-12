package com.boxing.maghnia.service;

import com.boxing.maghnia.domain.Boxer;
import com.boxing.maghnia.service.dto.BoxerSearch;

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
     * Get all the boxers with specific search creteria based on filter and value
     *
     * @param pageable the pagination information.
     * @param searchCriteria the search creteria pojo
     * @return the list of entities.
     */
    Page<Boxer> FindAllByFiltering(Pageable pageable, BoxerSearch searchCriteria);

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
