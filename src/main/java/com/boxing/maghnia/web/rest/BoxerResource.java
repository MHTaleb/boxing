package com.boxing.maghnia.web.rest;

import com.boxing.maghnia.domain.Boxer;
import com.boxing.maghnia.service.BoxerService;
import com.boxing.maghnia.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.boxing.maghnia.domain.Boxer}.
 */
@RestController
@RequestMapping("/api")
public class BoxerResource {

    private final Logger log = LoggerFactory.getLogger(BoxerResource.class);

    private static final String ENTITY_NAME = "boxer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BoxerService boxerService;

    public BoxerResource(BoxerService boxerService) {
        this.boxerService = boxerService;
    }

    /**
     * {@code POST  /boxers} : Create a new boxer.
     *
     * @param boxer the boxer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new boxer, or with status {@code 400 (Bad Request)} if the boxer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/boxers")
    public ResponseEntity<Boxer> createBoxer(@RequestBody Boxer boxer) throws URISyntaxException {
        log.debug("REST request to save Boxer : {}", boxer);
        if (boxer.getId() != null) {
            throw new BadRequestAlertException("A new boxer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Boxer result = boxerService.save(boxer);
        return ResponseEntity.created(new URI("/api/boxers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /boxers} : Updates an existing boxer.
     *
     * @param boxer the boxer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated boxer,
     * or with status {@code 400 (Bad Request)} if the boxer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the boxer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/boxers")
    public ResponseEntity<Boxer> updateBoxer(@RequestBody Boxer boxer) throws URISyntaxException {
        log.debug("REST request to update Boxer : {}", boxer);
        if (boxer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Boxer result = boxerService.save(boxer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, boxer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /boxers} : get all the boxers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boxers in body.
     */
    @GetMapping("/boxers")
    public ResponseEntity<List<Boxer>> getAllBoxers(Pageable pageable) {
        log.debug("REST request to get a page of Boxers");
        Page<Boxer> page = boxerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /boxers/:id} : get the "id" boxer.
     *
     * @param id the id of the boxer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the boxer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/boxers/{id}")
    public ResponseEntity<Boxer> getBoxer(@PathVariable Long id) {
        log.debug("REST request to get Boxer : {}", id);
        Optional<Boxer> boxer = boxerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(boxer);
    }

    /**
     * {@code DELETE  /boxers/:id} : delete the "id" boxer.
     *
     * @param id the id of the boxer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/boxers/{id}")
    public ResponseEntity<Void> deleteBoxer(@PathVariable Long id) {
        log.debug("REST request to delete Boxer : {}", id);
        boxerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
