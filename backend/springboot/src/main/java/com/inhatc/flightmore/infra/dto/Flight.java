package com.inhatc.flightmore.infra.dto;


import java.time.LocalDateTime;

public record Flight(
        String flightNumber,
        String flightAirline,
        String flightArrival,
        LocalDateTime flightArrivalDate,
        String flightDeparture,
        LocalDateTime flightDepartureDate,
        int flightPrice,
        String flightSite,
        LocalDateTime createdDate,
        LocalDateTime updatedDate,
        String url
) {}
