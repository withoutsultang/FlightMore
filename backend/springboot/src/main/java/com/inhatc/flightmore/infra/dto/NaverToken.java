package com.inhatc.flightmore.infra.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record NaverToken (
    String tokenType,
    String accessToken,
    Integer expiresIn,
    String refreshToken,
    String error,
    String errorDescription
    ) {
}
