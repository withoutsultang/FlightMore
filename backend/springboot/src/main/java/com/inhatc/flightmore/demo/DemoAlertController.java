package com.inhatc.flightmore.demo;

import com.inhatc.flightmore.domain.NotificationEntity;
import com.inhatc.flightmore.domain.NotificationRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Profile("demo")
@RequestMapping("/api/demo/alerts")
class DemoAlertController {
    private static final long DEMO_MEMBER = 1L;
    private final NotificationRepository notifications;
    private final JdbcTemplate jdbc;

    DemoAlertController(NotificationRepository notifications, JdbcTemplate jdbc) {
        this.notifications = notifications;
        this.jdbc = jdbc;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Alert create(@RequestBody Condition condition) {
        if (!validAirport(condition.departure()) || !validAirport(condition.destination())
                || condition.departure().equals(condition.destination())
                || condition.departureDate() == null || condition.returnDate() == null
                || condition.returnDate().isBefore(condition.departureDate())
                || condition.maxPrice() < 1 || condition.passengers() < 1 || condition.passengers() > 9) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "알림 조건을 확인해 주세요.");
        }
        return response(notifications.save(new NotificationEntity(DEMO_MEMBER,
                condition.departureDate(), condition.returnDate(), condition.departure(),
                condition.destination(), 0, condition.maxPrice(), condition.passengers())));
    }

    @GetMapping("/{id}")
    Alert get(@PathVariable long id) {
        return notifications.findById(id).filter(alert -> alert.getMemberId() == DEMO_MEMBER)
                .map(this::response).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private Alert response(NotificationEntity alert) {
        List<Flight> matches = jdbc.query("""
                SELECT code, airline, price_per_person, seats FROM demo_flight
                WHERE departure = ? AND destination = ? AND departure_date = ? AND return_date = ?
                  AND price_per_person <= ? AND seats >= ?
                ORDER BY price_per_person, code
                """, (rs, row) -> new Flight(rs.getString("code"), rs.getString("airline"),
                rs.getInt("price_per_person"), rs.getInt("seats")), alert.getDepartureLocation(),
                alert.getArrivalLocation(), alert.getDepartureDate(), alert.getArrivalDate(),
                alert.getMaxPrice(), alert.getNumPeople());
        return new Alert(alert.getId(), new Condition(alert.getDepartureLocation(), alert.getArrivalLocation(),
                alert.getDepartureDate(), alert.getArrivalDate(), alert.getMaxPrice(), alert.getNumPeople()), matches);
    }

    private boolean validAirport(String code) {
        return code != null && code.matches("[A-Z]{3}");
    }

    record Condition(String departure, String destination, LocalDate departureDate,
                     LocalDate returnDate, int maxPrice, int passengers) {}
    record Flight(String code, String airline, int pricePerPerson, int seats) {}
    record Alert(long id, Condition condition, List<Flight> matches) {}
}
