package com.boxing.maghnia.web.rest;

import com.boxing.maghnia.domain.Versement;
import com.boxing.maghnia.service.VersementService;
import com.boxing.maghnia.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.boxing.maghnia.domain.Versement}.
 */
@RestController
@RequestMapping("/api")
public class VersementResource {

    private final Logger log = LoggerFactory.getLogger(VersementResource.class);

    private static final String ENTITY_NAME = "versement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VersementService versementService;

    public VersementResource(VersementService versementService) {
        this.versementService = versementService;
    }

    /**
     * {@code POST  /versements} : Create a new versement.
     *
     * @param versement the versement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new versement, or with status {@code 400 (Bad Request)} if the versement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/versements")
    public ResponseEntity<Versement> createVersement(@RequestBody Versement versement) throws URISyntaxException {
        log.debug("REST request to save Versement : {}", versement);
        if (versement.getId() != null) {
            throw new BadRequestAlertException("A new versement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Versement result = versementService.save(versement);
        return ResponseEntity.created(new URI("/api/versements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /versements} : Updates an existing versement.
     *
     * @param versement the versement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated versement,
     * or with status {@code 400 (Bad Request)} if the versement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the versement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/versements")
    public ResponseEntity<Versement> updateVersement(@RequestBody Versement versement) throws URISyntaxException {
        log.debug("REST request to update Versement : {}", versement);
        if (versement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Versement result = versementService.save(versement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, versement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /versements} : get all the versements.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of versements in body.
     */
    @GetMapping("/versements")
    public List<Versement> getAllVersements() {
        log.debug("REST request to get all Versements");
        return versementService.findAll();
    }

    /**
     * {@code GET  /versements/:id} : get the "id" versement.
     *
     * @param id the id of the versement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the versement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/versements/{id}")
    public ResponseEntity<Versement> getVersement(@PathVariable Long id) {
        log.debug("REST request to get Versement : {}", id);
        Optional<Versement> versement = versementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(versement);
    }

    /**
     * {@code DELETE  /versements/:id} : delete the "id" versement.
     *
     * @param id the id of the versement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/versements/{id}")
    public ResponseEntity<Void> deleteVersement(@PathVariable Long id) {
        log.debug("REST request to delete Versement : {}", id);
        versementService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
