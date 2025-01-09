package com.inhatc.flightmore.application;

import com.inhatc.flightmore.domain.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AlertService {
    @Value("${telegram.bot.token}")
    private String telegramBotToken;

    private final String TELEGRAM_API_URL = "https://api.telegram.org/bot";

    private final RestTemplate restTemplate;

    private final TelegramService telegramService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    public AlertService(RestTemplate restTemplate, TelegramService telegramService) {
        this.restTemplate = restTemplate;
        this.telegramService = telegramService;
    }

    @Transactional
    public void generateAlertsForMatchingFlights(List<FlightEntity> flights) {
        List<NotificationEntity> allNotifications = notificationRepository.findAll();

        Map<Long, List<FlightEntity>> notificationsMap = new HashMap<>();

        for (FlightEntity flight : flights) {
            for (NotificationEntity notification : allNotifications) {
                if (isFlightMatchingNotification(flight, notification)) {
                    //createAlertForUser(flight, notification.getMemberId());
                    // 알림 id별 항공권 목록을 저장
                    notificationsMap
                            .computeIfAbsent(notification.getId(), k -> new ArrayList<>())
                            .add(flight);
                }
            }
        }
        // 알림 id별 최저가 항공권 3개 추출
        for(Map.Entry<Long, List<FlightEntity>> entry : notificationsMap.entrySet()) {
            NotificationEntity notification = notificationRepository.findById(entry.getKey()).orElse(null);
            if (notification == null) {
                continue;
            }
            // 최저가 항공권 3개 추출
            List<FlightEntity> lowPriceFlights = entry.getValue().stream()
                    .sorted(Comparator.comparing(FlightEntity::getFlightPrice))
                    .limit(3)
                    .collect(Collectors.toList());

            // 알림 생성
            for(FlightEntity flight : lowPriceFlights) {
                createAlertForUser(flight, notification.getMemberId());
            }
        }
    }

    private boolean isFlightMatchingNotification(FlightEntity flight, NotificationEntity notification) {
        // 출발지와 도착지 비교 시 대소문자 무시 및 공백 제거
        boolean departureMatches = flight.getFlightDeparture().trim().equalsIgnoreCase(notification.getDepartureLocation().trim());
        boolean arrivalMatches = flight.getFlightArrival().trim().equalsIgnoreCase(notification.getArrivalLocation().trim());

        // 출발 및 도착 날짜 비교
        LocalDateTime flightDepartureDateTime = flight.getFlightDepartureDate();
        LocalDateTime notificationDepartureStart = LocalDateTime.of(notification.getDepartureDate(), LocalTime.MIN);
        LocalDateTime flightArrivalDateTime = flight.getFlightArrivalDate();
        LocalDateTime notificationArrivalEnd = LocalDateTime.of(notification.getArrivalDate(), LocalTime.MAX);

        boolean dateMatches = !flightDepartureDateTime.isBefore(notificationDepartureStart)
                && !flightArrivalDateTime.isAfter(notificationArrivalEnd);

        // 가격 비교 (최소 가격과 최대 가격 조건 체크)
        boolean priceMatches = (flight.getFlightPrice() >= notification.getMinPrice())
                && (flight.getFlightPrice() <= notification.getMaxPrice());
        // 조건 매칭에 대한 로그 추가
        System.out.println("Departure matches: " + departureMatches);
        System.out.println("Arrival matches: " + arrivalMatches);
        System.out.println("Date matches: " + dateMatches);
        System.out.println("Price matches: " + priceMatches);
        return departureMatches && arrivalMatches && dateMatches && priceMatches;
    }

    @Autowired
    private NaverMemberRepository memberRepository;

    @Transactional
    public void createAlertForUser(FlightEntity flight, Long memberId) {
        // 알림 엔티티 생성
        AlertEntity alert = new AlertEntity();
        alert.setMemberId(memberId);
        alert.setFlight(flight.getFlightId());
        alert.setCreatedDate(LocalDateTime.now());
        alert.setAlertStatus("ACTIVE");

//        alertRepository.save(alert);
        System.out.println("Alert saved for member: " + memberId + " and flight: " + flight.getFlightId());

        // 회원 정보에서 chatId 가져오기
        NaverMember member = memberRepository.findById(memberId).orElse(null);
        if (member == null || member.getChatId() == null) {
            return; // chatId가 없으면 메시지를 보낼 수 없으므로 종료
        }

        // 텔레그램 메시지 생성
        String message = String.format(
                "🚨 항공권 알림 🚨\n\n" +
                        "출발지: %s\n" +
                        "도착지: %s\n" +
                        "출발일: %s\n" +
                        "복귀날: %s\n" +
                        "가격: %d원\n" +
                        "사이트: %s\n" +
                        "좋은 가격의 항공권을 확인하세요!",
                flight.getFlightDeparture(),
                flight.getFlightArrival(),
                flight.getFlightDepartureDate().toString(),
                flight.getFlightArrivalDate().toString(),
                flight.getFlightPrice(),
                flight.getUrl()
        );

        // 텔레그램 메시지 전송
        String chatId = member.getChatId();
        sendMessageToTelegram(chatId, message);
    }


    public void sendMessageToTelegram(String chatId, String message) {
        String url = String.format("%s%s/sendMessage?chat_id=%s&text=%s", TELEGRAM_API_URL, telegramBotToken, chatId, message);
        try {
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Telegram response: " + response); // 응답 출력
        } catch (Exception e) {
            System.out.println("Failed to send message to Telegram for chatId: " + chatId);

            e.printStackTrace(); // 에러 로그 출력
        }
    }
}
