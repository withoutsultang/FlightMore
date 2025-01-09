package com.inhatc.flightmore.application;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TelegramService {

    private static final String TELEGRAM_API_URL = "https://api.telegram.org/bot";
    private static final String BOT_TOKEN = "YOUR_BOT_TOKEN";  // 텔레그램 봇의 토큰을 입력

    public void sendMessage(String chatId, String message) {
        String url = TELEGRAM_API_URL + BOT_TOKEN + "/sendMessage?chat_id=" + chatId + "&text=" + message;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(url, String.class);
    }
}
