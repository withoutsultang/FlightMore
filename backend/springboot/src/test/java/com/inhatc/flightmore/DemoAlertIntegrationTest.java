package com.inhatc.flightmore;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("demo")
class DemoAlertIntegrationTest {
    private static final String API = "/api/demo/alerts";
    private static final String CONDITION = """
            {"departure":"ICN","destination":"NRT","departureDate":"2027-05-12",
             "returnDate":"2027-05-16","maxPrice":230000,"passengers":2}
            """;

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    @Autowired JdbcTemplate jdbc;

    @Test
    void savesConditionAndReturnsOnlyMatchingFlightsInPriceOrder() throws Exception {
        String body = mvc.perform(post(API).contentType(MediaType.APPLICATION_JSON).content(CONDITION))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.matches.length()").value(2))
                .andExpect(jsonPath("$.matches[0].code").value("FM101"))
                .andExpect(jsonPath("$.matches[1].code").value("FM102"))
                .andReturn().getResponse().getContentAsString();
        long id = mapper.readTree(body).path("id").asLong();
        assertEquals(230000, jdbc.queryForObject("SELECT max_price FROM notification WHERE id = ?",
                Integer.class, id));
        mvc.perform(get(API + "/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.condition.passengers").value(2))
                .andExpect(jsonPath("$.matches[0].pricePerPerson").value(189000));
    }

    @Test
    void handlesEmptyMatchesAndInvalidConditions() throws Exception {
        mvc.perform(post(API).contentType(MediaType.APPLICATION_JSON)
                        .content(CONDITION.replace("230000", "100000")))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.matches.length()").value(0));
        mvc.perform(post(API).contentType(MediaType.APPLICATION_JSON)
                        .content(CONDITION.replace("2027-05-16", "2027-05-11")))
                .andExpect(status().isBadRequest());
        mvc.perform(get(API + "/999999")).andExpect(status().isNotFound());
        mvc.perform(get("/login/naver")).andExpect(status().isForbidden());
    }
}
