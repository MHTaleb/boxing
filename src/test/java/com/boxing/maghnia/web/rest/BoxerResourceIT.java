package com.boxing.maghnia.web.rest;

import com.boxing.maghnia.BoxingApp;
import com.boxing.maghnia.domain.Boxer;
import com.boxing.maghnia.repository.BoxerRepository;
import com.boxing.maghnia.service.BoxerService;
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
 * Integration tests for the {@link BoxerResource} REST controller.
 */
@SpringBootTest(classes = BoxingApp.class)
public class BoxerResourceIT {

    private static final String DEFAULT_FULL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FULL_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_BIRTH_DATE = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private BoxerRepository boxerRepository;

    @Autowired
    private BoxerService boxerService;

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

    private MockMvc restBoxerMockMvc;

    private Boxer boxer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BoxerResource boxerResource = new BoxerResource(boxerService);
        this.restBoxerMockMvc = MockMvcBuilders.standaloneSetup(boxerResource)
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
    public static Boxer createEntity(EntityManager em) {
        Boxer boxer = new Boxer()
            .fullName(DEFAULT_FULL_NAME)
            .birthDate(DEFAULT_BIRTH_DATE)
            .phone(DEFAULT_PHONE);
        return boxer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Boxer createUpdatedEntity(EntityManager em) {
        Boxer boxer = new Boxer()
            .fullName(UPDATED_FULL_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .phone(UPDATED_PHONE);
        return boxer;
    }

    @BeforeEach
    public void initTest() {
        boxer = createEntity(em);
    }

    @Test
    @Transactional
    public void createBoxer() throws Exception {
        int databaseSizeBeforeCreate = boxerRepository.findAll().size();

        // Create the Boxer
        restBoxerMockMvc.perform(post("/api/boxers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(boxer)))
            .andExpect(status().isCreated());

        // Validate the Boxer in the database
        List<Boxer> boxerList = boxerRepository.findAll();
        assertThat(boxerList).hasSize(databaseSizeBeforeCreate + 1);
        Boxer testBoxer = boxerList.get(boxerList.size() - 1);
        assertThat(testBoxer.getFullName()).isEqualTo(DEFAULT_FULL_NAME);
        assertThat(testBoxer.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testBoxer.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    @Transactional
    public void createBoxerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = boxerRepository.findAll().size();

        // Create the Boxer with an existing ID
        boxer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBoxerMockMvc.perform(post("/api/boxers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(boxer)))
            .andExpect(status().isBadRequest());

        // Validate the Boxer in the database
        List<Boxer> boxerList = boxerRepository.findAll();
        assertThat(boxerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBoxers() throws Exception {
        // Initialize the database
        boxerRepository.saveAndFlush(boxer);

        // Get all the boxerList
        restBoxerMockMvc.perform(get("/api/boxers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(boxer.getId().intValue())))
            .andExpect(jsonPath("$.[*].fullName").value(hasItem(DEFAULT_FULL_NAME.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }
    
    @Test
    @Transactional
    public void getBoxer() throws Exception {
        // Initialize the database
        boxerRepository.saveAndFlush(boxer);

        // Get the boxer
        restBoxerMockMvc.perform(get("/api/boxers/{id}", boxer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(boxer.getId().intValue()))
            .andExpect(jsonPath("$.fullName").value(DEFAULT_FULL_NAME.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBoxer() throws Exception {
        // Get the boxer
        restBoxerMockMvc.perform(get("/api/boxers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBoxer() throws Exception {
        // Initialize the database
        boxerService.save(boxer);

        int databaseSizeBeforeUpdate = boxerRepository.findAll().size();

        // Update the boxer
        Boxer updatedBoxer = boxerRepository.findById(boxer.getId()).get();
        // Disconnect from session so that the updates on updatedBoxer are not directly saved in db
        em.detach(updatedBoxer);
        updatedBoxer
            .fullName(UPDATED_FULL_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .phone(UPDATED_PHONE);

        restBoxerMockMvc.perform(put("/api/boxers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBoxer)))
            .andExpect(status().isOk());

        // Validate the Boxer in the database
        List<Boxer> boxerList = boxerRepository.findAll();
        assertThat(boxerList).hasSize(databaseSizeBeforeUpdate);
        Boxer testBoxer = boxerList.get(boxerList.size() - 1);
        assertThat(testBoxer.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testBoxer.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testBoxer.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingBoxer() throws Exception {
        int databaseSizeBeforeUpdate = boxerRepository.findAll().size();

        // Create the Boxer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoxerMockMvc.perform(put("/api/boxers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(boxer)))
            .andExpect(status().isBadRequest());

        // Validate the Boxer in the database
        List<Boxer> boxerList = boxerRepository.findAll();
        assertThat(boxerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBoxer() throws Exception {
        // Initialize the database
        boxerService.save(boxer);

        int databaseSizeBeforeDelete = boxerRepository.findAll().size();

        // Delete the boxer
        restBoxerMockMvc.perform(delete("/api/boxers/{id}", boxer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Boxer> boxerList = boxerRepository.findAll();
        assertThat(boxerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Boxer.class);
        Boxer boxer1 = new Boxer();
        boxer1.setId(1L);
        Boxer boxer2 = new Boxer();
        boxer2.setId(boxer1.getId());
        assertThat(boxer1).isEqualTo(boxer2);
        boxer2.setId(2L);
        assertThat(boxer1).isNotEqualTo(boxer2);
        boxer1.setId(null);
        assertThat(boxer1).isNotEqualTo(boxer2);
    }
}
