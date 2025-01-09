package com.inhatc.flightmore.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TelegramUpdateScheduler {

    @Autowired
    private TelegramUpdateService telegramUpdateService;

    // 1분마다 getUpdates 호출
    @Scheduled(fixedRate = 60000)
    public void fetchTelegramUpdates() {
        telegramUpdateService.getUpdates();
    }
}
