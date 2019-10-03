package com.boxing.maghnia.web.rest;

import com.boxing.maghnia.BoxingApp;
import com.boxing.maghnia.domain.Versement;
import com.boxing.maghnia.repository.VersementRepository;
import com.boxing.maghnia.service.VersementService;
import com.boxing.maghnia.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.boxing.maghnia.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VersementResource} REST controller.
 */
@SpringBootTest(classes = BoxingApp.class)
public class VersementResourceIT {

    private static final Double DEFAULT_MONTANT = 1D;
    private static final Double UPDATED_MONTANT = 2D;
    private static final Double SMALLER_MONTANT = 1D - 1D;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE = LocalDate.ofEpochDay(-1L);

    @Autowired
    private VersementRepository versementRepository;

    @Autowired
    private VersementService versementService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restVersementMockMvc;

    private Versement versement;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VersementResource versementResource = new VersementResource(versementService);
        this.restVersementMockMvc = MockMvcBuilders.standaloneSetup(versementResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Versement createEntity(EntityManager em) {
        Versement versement = new Versement()
            .montant(DEFAULT_MONTANT)
            .date(DEFAULT_DATE);
        return versement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Versement createUpdatedEntity(EntityManager em) {
        Versement versement = new Versement()
            .montant(UPDATED_MONTANT)
            .date(UPDATED_DATE);
        return versement;
    }

    @BeforeEach
    public void initTest() {
        versement = createEntity(em);
    }

    @Test
    @Transactional
    public void createVersement() throws Exception {
        int databaseSizeBeforeCreate = versementRepository.findAll().size();

        // Create the Versement
        restVersementMockMvc.perform(post("/api/versements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versement)))
            .andExpect(status().isCreated());

        // Validate the Versement in the database
        List<Versement> versementList = versementRepository.findAll();
        assertThat(versementList).hasSize(databaseSizeBeforeCreate + 1);
        Versement testVersement = versementList.get(versementList.size() - 1);
        assertThat(testVersement.getMontant()).isEqualTo(DEFAULT_MONTANT);
        assertThat(testVersement.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createVersementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = versementRepository.findAll().size();

        // Create the Versement with an existing ID
        versement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVersementMockMvc.perform(post("/api/versements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versement)))
            .andExpect(status().isBadRequest());

        // Validate the Versement in the database
        List<Versement> versementList = versementRepository.findAll();
        assertThat(versementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVersements() throws Exception {
        // Initialize the database
        versementRepository.saveAndFlush(versement);

        // Get all the versementList
        restVersementMockMvc.perform(get("/api/versements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(versement.getId().intValue())))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getVersement() throws Exception {
        // Initialize the database
        versementRepository.saveAndFlush(versement);

        // Get the versement
        restVersementMockMvc.perform(get("/api/versements/{id}", versement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(versement.getId().intValue()))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVersement() throws Exception {
        // Get the versement
        restVersementMockMvc.perform(get("/api/versements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVersement() throws Exception {
        // Initialize the database
        versementService.save(versement);

        int databaseSizeBeforeUpdate = versementRepository.findAll().size();

        // Update the versement
        Versement updatedVersement = versementRepository.findById(versement.getId()).get();
        // Disconnect from session so that the updates on updatedVersement are not directly saved in db
        em.detach(updatedVersement);
        updatedVersement
            .montant(UPDATED_MONTANT)
            .date(UPDATED_DATE);

        restVersementMockMvc.perform(put("/api/versements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVersement)))
            .andExpect(status().isOk());

        // Validate the Versement in the database
        List<Versement> versementList = versementRepository.findAll();
        assertThat(versementList).hasSize(databaseSizeBeforeUpdate);
        Versement testVersement = versementList.get(versementList.size() - 1);
        assertThat(testVersement.getMontant()).isEqualTo(UPDATED_MONTANT);
        assertThat(testVersement.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingVersement() throws Exception {
        int databaseSizeBeforeUpdate = versementRepository.findAll().size();

        // Create the Versement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVersementMockMvc.perform(put("/api/versements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versement)))
            .andExpect(status().isBadRequest());

        // Validate the Versement in the database
        List<Versement> versementList = versementRepository.findAll();
        assertThat(versementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVersement() throws Exception {
        // Initialize the database
        versementService.save(versement);

        int databaseSizeBeforeDelete = versementRepository.findAll().size();

        // Delete the versement
        restVersementMockMvc.perform(delete("/api/versements/{id}", versement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Versement> versementList = versementRepository.findAll();
        assertThat(versementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Versement.class);
        Versement versement1 = new Versement();
        versement1.setId(1L);
        Versement versement2 = new Versement();
        versement2.setId(versement1.getId());
        assertThat(versement1).isEqualTo(versement2);
        versement2.setId(2L);
        assertThat(versement1).isNotEqualTo(versement2);
        versement1.setId(null);
        assertThat(versement1).isNotEqualTo(versement2);
    }
}
