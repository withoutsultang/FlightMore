package com.inhatc.flightmore.application;

import com.inhatc.flightmore.domain.FlightEntity;
import com.inhatc.flightmore.domain.FlightRepository;
import com.inhatc.flightmore.infra.dto.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private AlertService alertService;

    public void saveOrUpdateFlight(Flight flight) {
        Optional<FlightEntity> existingFlightOpt = flightRepository.findByFlightAirlineAndFlightArrivalAndFlightArrivalDateAndFlightDepartureAndFlightDepartureDate(
                flight.flightAirline(),
                flight.flightArrival(),
                flight.flightArrivalDate(),
                flight.flightDeparture(),
                flight.flightDepartureDate()
        );

        FlightEntity savedFlight;

        if (existingFlightOpt.isPresent()) {
            FlightEntity existingFlight = existingFlightOpt.get();
            if (existingFlight.getFlightPrice() != flight.flightPrice()) {
                existingFlight.updateFlight(flight);
                savedFlight = flightRepository.save(existingFlight);
                alertService.generateAlertsForMatchingFlights(List.of(savedFlight));
            }
        } else {
            FlightEntity newFlight = new FlightEntity(flight);
            newFlight.setCreatedDate(LocalDateTime.now());
            savedFlight = flightRepository.save(newFlight);
            alertService.generateAlertsForMatchingFlights(List.of(savedFlight));
        }
    }

    public void saveOrUpdateFlights(List<Flight> flights) {
        flights.forEach(this::saveOrUpdateFlight);
    }

    public List<Flight> getAllFlights() {
        List<FlightEntity> flightEntities = flightRepository.findAll();
        return flightEntities.stream()
                .map(entity -> new Flight(
                        entity.getFlightNumber(),
                        entity.getFlightAirline(),
                        entity.getFlightArrival(),
                        entity.getFlightArrivalDate(),
                        entity.getFlightDeparture(),
                        entity.getFlightDepartureDate(),
                        entity.getFlightPrice(),
                        entity.getFlightSite(),
                        entity.getCreatedDate(),
                        entity.getUpdatedDate(),
                        entity.getUrl()
                )).toList();
    }
}

