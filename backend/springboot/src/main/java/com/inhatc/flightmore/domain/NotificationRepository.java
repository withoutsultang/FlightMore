package com.inhatc.flightmore.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    boolean existsByMemberIdAndDepartureDateAndArrivalDateAndDepartureLocationAndArrivalLocationAndMinPriceAndMaxPriceAndNumPeople(
            Long memberId,
            LocalDate departureDate,
            LocalDate arrivalDate,
            String departureLocation,
            String arrivalLocation,
            int minPrice,
            int maxPrice,
            int numPeople);

    // 특정 회원의 알림 목록 조회
    List<NotificationEntity> findByMemberId(Long memberId);
}

