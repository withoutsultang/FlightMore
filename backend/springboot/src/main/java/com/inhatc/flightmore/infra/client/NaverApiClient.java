package com.inhatc.flightmore.infra.client;

import com.inhatc.flightmore.infra.dto.NaverMemeberResponse;
import com.inhatc.flightmore.infra.dto.NaverToken;
import org.springframework.util.MultiValueMap;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

public interface NaverApiClient {
    @PostExchange(url = "https://nid.naver.com/oauth2.0/token", contentType = APPLICATION_FORM_URLENCODED_VALUE)
    NaverToken fetchToken(@RequestParam MultiValueMap<String, String> params);

    @PostExchange(url = "https://nid.naver.com/oauth2.0/token", contentType = APPLICATION_FORM_URLENCODED_VALUE)
    NaverMemeberResponse deleteToken(@RequestParam MultiValueMap<String, String> params);

    @GetExchange(url = "https://openapi.naver.com/v1/nid/me")
    NaverMemeberResponse fetchMember(@RequestHeader(name = AUTHORIZATION) String bearertoken);

}
