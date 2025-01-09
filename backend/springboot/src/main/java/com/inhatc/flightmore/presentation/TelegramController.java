package com.inhatc.flightmore.presentation;

import com.inhatc.flightmore.application.TelegramService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TelegramController {

    private final TelegramService telegramService;

    public TelegramController(TelegramService telegramService) {
        this.telegramService = telegramService;
    }

    @GetMapping("/send-telegram-message")
    public String sendTelegramMessage() {
        String chatId = "YOUR_CHAT_ID";  // 텔레그램 봇과 연결된 채팅 ID를 입력
        String message = "테스트 메시지입니다!";
        telegramService.sendMessage(chatId, message);
        return "Message sent!";
    }
}
