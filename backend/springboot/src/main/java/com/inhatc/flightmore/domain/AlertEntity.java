package com.inhatc.flightmore.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "alert")
public class AlertEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long flightId;

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String alertStatus;

    public AlertEntity() {}

    public Long getFlight() {
        return flightId;
    }

    public void setFlight(Long flightId) {
        this.flightId = flightId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
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

    public String getAlertStatus() {
        return alertStatus;
    }

    public void setAlertStatus(String alertStatus) {
        this.alertStatus = alertStatus;
    }
// Getters and Setters
}
