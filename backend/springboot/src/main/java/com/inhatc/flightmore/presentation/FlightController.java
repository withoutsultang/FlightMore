package com.inhatc.flightmore.presentation;


import com.inhatc.flightmore.application.FlightService;
import com.inhatc.flightmore.infra.dto.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    // 항공편 저장 또는 업데이트
    @PostMapping
    public ResponseEntity<String> saveOrUpdateFlight(@RequestBody List<Flight> flights) {
        try {
            flightService.saveOrUpdateFlights(flights);
            return ResponseEntity.ok("항공편 정보가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            e.getStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("항공편 정보 저장 중 오류 발생");
        }
    }

    // 모든 항공편 조회 (예시)
    @GetMapping("/all")
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return ResponseEntity.ok(flights);
    }
}

