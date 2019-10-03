package com.boxing.maghnia.service.impl;

import com.boxing.maghnia.service.BoxerService;
import com.boxing.maghnia.domain.Boxer;
import com.boxing.maghnia.repository.BoxerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Boxer}.
 */
@Service
@Transactional
public class BoxerServiceImpl implements BoxerService {

    private final Logger log = LoggerFactory.getLogger(BoxerServiceImpl.class);

    private final BoxerRepository boxerRepository;

    public BoxerServiceImpl(BoxerRepository boxerRepository) {
        this.boxerRepository = boxerRepository;
    }

    /**
     * Save a boxer.
     *
     * @param boxer the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Boxer save(Boxer boxer) {
        log.debug("Request to save Boxer : {}", boxer);
        return boxerRepository.save(boxer);
    }

    /**
     * Get all the boxers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Boxer> findAll(Pageable pageable) {
        log.debug("Request to get all Boxers");
        return boxerRepository.findAll(pageable);
    }


    /**
     * Get one boxer by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Boxer> findOne(Long id) {
        log.debug("Request to get Boxer : {}", id);
        return boxerRepository.findById(id);
    }

    /**
     * Delete the boxer by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Boxer : {}", id);
        boxerRepository.deleteById(id);
    }
}
