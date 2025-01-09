package com.inhatc.flightmore.presentation;

import com.inhatc.flightmore.domain.NotificationEntity;
import com.inhatc.flightmore.domain.NotificationRepository;
import com.inhatc.flightmore.infra.dto.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notify")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping
    public ResponseEntity<String> saveNotification(@RequestBody Notification notifyDTO) {
        try {
            // 모든 조건으로 중복 여부 확인
            boolean exists = notificationRepository.existsByMemberIdAndDepartureDateAndArrivalDateAndDepartureLocationAndArrivalLocationAndMinPriceAndMaxPriceAndNumPeople(
                    notifyDTO.memberId(),
                    notifyDTO.departureDate(),
                    notifyDTO.arrivalDate(),
                    notifyDTO.departureLocation(),
                    notifyDTO.arrivalLocation(),
                    notifyDTO.minPrice(),
                    notifyDTO.maxPrice(),
                    notifyDTO.numPeople()
            );

            if (exists) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("중복된 알림이 존재합니다.");
            }

            NotificationEntity notificationEntity = new NotificationEntity(
                    notifyDTO.memberId(),
                    notifyDTO.departureDate(),
                    notifyDTO.arrivalDate(),
                    notifyDTO.departureLocation(),
                    notifyDTO.arrivalLocation(),
                    notifyDTO.minPrice(),
                    notifyDTO.maxPrice(),
                    notifyDTO.numPeople()
            );

            notificationRepository.save(notificationEntity);

            return ResponseEntity.ok("알림이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            // 로깅 추가
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("알림 저장 중 오류 발생.");
        }
    }

    // 특정 회원의 알림 목록 조회
    @GetMapping("/{memberId}")
    public ResponseEntity<List<Notification>> getNotificationsByMember(@PathVariable Long memberId) {
        List<NotificationEntity> notificationEntities = notificationRepository.findByMemberId(memberId);

        // 엔티티 -> DTO 변환
        List<Notification> notifications = notificationEntities.stream()
                .map(entity -> new Notification(
                        entity.getMemberId(),
                        entity.getDepartureDate(),
                        entity.getArrivalDate(),
                        entity.getDepartureLocation(),
                        entity.getArrivalLocation(),
                        entity.getMinPrice(),
                        entity.getMaxPrice(),
                        entity.getNumPeople(),
                        entity.getId()))

                .toList();

        return ResponseEntity.ok(notifications);
    }

    // 모든 알림 목록 조회 (크롤링용)
    @GetMapping("/all")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<NotificationEntity> notificationEntities = notificationRepository.findAll();

        // 엔티티 -> DTO 변환
        List<Notification> notifications = notificationEntities.stream()
                .map(entity -> new Notification(
                        entity.getMemberId(),
                        entity.getDepartureDate(),
                        entity.getArrivalDate(),
                        entity.getDepartureLocation(),
                        entity.getArrivalLocation(),
                        entity.getMinPrice(),
                        entity.getMaxPrice(),
                        entity.getNumPeople(),
                        entity.getId()))
                .toList();

        return ResponseEntity.ok(notifications);
    }

    // 알림 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable("id") Long id) {
        try {
            if (!notificationRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 알림이 존재하지 않습니다.");
            }
            notificationRepository.deleteById(id);
            return ResponseEntity.ok("알림이 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("알림 삭제 중 오류 발생.");
        }
    }
}

