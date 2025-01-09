package com.inhatc.flightmore.domain;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "notification")
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long memberId;
    private LocalDate departureDate;
    private LocalDate arrivalDate;
    private String departureLocation;
    private String arrivalLocation;
    private int minPrice;
    private int maxPrice;
    private int numPeople;

    // 기본 생성자
    public NotificationEntity() {}

    // 생성자
    public NotificationEntity(Long memberId, LocalDate departureDate, LocalDate arrivalDate, String departureLocation,
                              String arrivalLocation, int minPrice, int maxPrice, int numPeople) {
        this.memberId = memberId;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.numPeople = numPeople;
    }

    // Getters (필요하면 추가)
    public Long getMemberId() { return memberId; }
    public LocalDate getDepartureDate() { return departureDate; }
    public LocalDate getArrivalDate() { return arrivalDate; }
    public String getDepartureLocation() { return departureLocation; }
    public String getArrivalLocation() { return arrivalLocation; }
    public int getMinPrice() { return minPrice; }
    public int getMaxPrice() { return maxPrice; }
    public int getNumPeople() { return numPeople; }
    public Long getId() { return id; }

    // Setters (필요하면 추가)
}
