package com.boxing.maghnia.service;

import com.boxing.maghnia.domain.Versement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.Set;

/**
 * Service Interface for managing {@link Versement}.
 */
public interface VersementService {

    /**
     * Save a versement.
     *
     * @param versement the entity to save.
     * @return the persisted entity.
     */
    Versement save(Versement versement);

    /**
     * Get all the versements.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Versement> findAll(Pageable pageable);


    /**
     * Get the "id" versement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Versement> findOne(Long id);

    /**
     * Delete the "id" versement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

	Set<Versement> findAllVersementOfBoxer(Long id);
}
