package com.inhatc.flightmore.infra;

import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "naver")
public record NaverConfig(
        String redirectUri,
        String clientId,
        String clientSecret,
        String state
) {
}