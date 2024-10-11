package com.inhatc.flightmore.infra;

import lombok.RequiredArgsConstructor;
import com.inhatc.flightmore.domain.ServerType;
import com.inhatc.flightmore.domain.CodeRequestUrlProvider;
import com.inhatc.flightmore.infra.NaverConfig;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class NaverCodeRequestUrlProvider implements CodeRequestUrlProvider {
    private final NaverConfig naverConfig;

    @Override
    public ServerType supportServer() {
        return ServerType.NAVER;
    }

    @Override
    public String provide() {
        return UriComponentsBuilder.fromUriString("https://nid.naver.com/oauth2.0/authorize")
                .queryParam("response_type", "code")
                .queryParam("client_id", naverConfig.clientId())
                .queryParam("redirect_uri", naverConfig.redirectUri())
                .queryParam("state", "FlightMore")
                .toUriString();
    }

}