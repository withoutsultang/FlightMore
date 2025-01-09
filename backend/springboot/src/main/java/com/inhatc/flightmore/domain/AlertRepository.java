package com.inhatc.flightmore.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<AlertEntity, Long> {
    List<AlertEntity> findByFlightId(Long flightId);
    List<AlertEntity> findByMemberId(Long memberId);

}
