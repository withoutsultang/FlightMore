package com.inhatc.flightmore.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface FlightRepository extends JpaRepository<FlightEntity, Long> {
    Optional<FlightEntity> findByFlightAirlineAndFlightArrivalAndFlightArrivalDateAndFlightDepartureAndFlightDepartureDate(
            String flightAirline,
            String flightArrival,
            LocalDateTime flightArrivalDate,
            String flightDeparture,
            LocalDateTime flightDepartureDate
    );
}

