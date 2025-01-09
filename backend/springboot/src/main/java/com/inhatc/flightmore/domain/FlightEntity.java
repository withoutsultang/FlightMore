package com.inhatc.flightmore.domain;

import com.inhatc.flightmore.infra.dto.Flight;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fm_flight")
public class FlightEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    @Column(nullable = false)
    private String flightNumber;

    @Column(nullable = false)
    private String flightAirline;

    @Column(nullable = false)
    private String flightArrival;

    @Column(nullable = false)
    private LocalDateTime flightArrivalDate;

    @Column(nullable = false)
    private String flightDeparture;

    @Column(nullable = false)
    private LocalDateTime flightDepartureDate;

    @Column(nullable = false)
    private int flightPrice;

    @Column(nullable = false)
    private String flightSite;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private LocalDateTime updatedDate;

    @Column(nullable = false)
    private String url;

    // 기본 생성자
    protected FlightEntity() {}

    public FlightEntity(String flightNumber, String flightAirline, String flightArrival, LocalDateTime flightArrivalDate,
                        String flightDeparture, LocalDateTime flightDepartureDate, int flightPrice,
                        String flightSite, LocalDateTime createdDate, LocalDateTime updatedDate, String url) {
        this.flightNumber = flightNumber;
        this.flightAirline = flightAirline;
        this.flightArrival = flightArrival;
        this.flightArrivalDate = flightArrivalDate;
        this.flightDeparture = flightDeparture;
        this.flightDepartureDate = flightDepartureDate;
        this.flightPrice = flightPrice;
        this.flightSite = flightSite;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.url = url;
    }

    // FlightDTO로부터 엔티티를 생성하는 생성자
    public FlightEntity(Flight flight) {
        this.flightNumber = flight.flightNumber();
        this.flightAirline = flight.flightAirline();
        this.flightArrival = flight.flightArrival();
        this.flightArrivalDate = flight.flightArrivalDate();
        this.flightDeparture = flight.flightDeparture();
        this.flightDepartureDate = flight.flightDepartureDate();
        this.flightPrice = flight.flightPrice();
        this.flightSite = flight.flightSite();
        this.createdDate = (flight.createdDate() != null) ? flight.createdDate() : LocalDateTime.now();
        this.updatedDate = flight.updatedDate();
        this.url = flight.url();
    }

    // 업데이트용 메서드
    public void updateFlight(Flight flight) {
        this.flightPrice = flight.flightPrice();
        this.updatedDate = LocalDateTime.now();
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }


    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getFlightAirline() {
        return flightAirline;
    }

    public void setFlightAirline(String flightAirline) {
        this.flightAirline = flightAirline;
    }

    public String getFlightArrival() {
        return flightArrival;
    }

    public void setFlightArrival(String flightArrival) {
        this.flightArrival = flightArrival;
    }

    public LocalDateTime getFlightArrivalDate() {
        return flightArrivalDate;
    }

    public void setFlightArrivalDate(LocalDateTime flightArrivalDate) {
        this.flightArrivalDate = flightArrivalDate;
    }

    public String getFlightDeparture() {
        return flightDeparture;
    }

    public void setFlightDeparture(String flightDeparture) {
        this.flightDeparture = flightDeparture;
    }

    public LocalDateTime getFlightDepartureDate() {
        return flightDepartureDate;
    }

    public void setFlightDepartureDate(LocalDateTime flightDepartureDate) {
        this.flightDepartureDate = flightDepartureDate;
    }

    public void setFlightPrice(int flightPrice) {
        this.flightPrice = flightPrice;
    }

    public String getFlightSite() {
        return flightSite;
    }

    public void setFlightSite(String flightSite) {
        this.flightSite = flightSite;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    // Getters
    public Long getFlightId() { return flightId; }

    public int getFlightPrice() {
        return flightPrice;
    }

    public String getUrl(){
        return url;
    }
}
