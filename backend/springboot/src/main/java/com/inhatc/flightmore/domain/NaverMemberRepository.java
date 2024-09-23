package com.inhatc.flightmore.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface NaverMemberRepository extends JpaRepository<NaverMember, Long> {
    Optional<NaverMember> findByNaverId(NaverId naverId);
}
