package com.inhatc.flightmore.application;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TelegramUpdateService {

    @Value("${telegram.bot.token}")
    private String botToken;

    private final String TELEGRAM_API_URL = "https://api.telegram.org/bot";
    private int lastUpdatedId = 0;

    @Autowired
    private TelegramIntegrationService telegramIntegrationService;

    public void getUpdates() {
        String url = TELEGRAM_API_URL + botToken + "/getUpdates";

        // 만약 lastUpdateId가 존재하면, 오프셋을 설정하여 중복 메시지를 방지
        if (lastUpdatedId > 0) {
            url += "?offset=" + (lastUpdatedId + 1);
        }
        try {
            RestTemplate restTemplate = new RestTemplate();
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            System.out.println("Response from Telegram: " + response);

            if (response != null && response.get("ok").asBoolean()) {
                JsonNode updates = response.get("result");
                if (updates.isArray()) {
                    for (JsonNode update : updates) {
                        processUpdate(update);
                        lastUpdatedId = update.get("update_id").asInt();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void processUpdate(JsonNode update) {
        JsonNode message = update.get("message");
        if (message != null) {
            String chatId = message.get("chat").get("id").asText();
            String text = message.get("text").asText();

            if (text.startsWith("AUTH:")) {
                String authCode = text.split("AUTH:")[1].trim();
                verifyTelegramCode(authCode, chatId);
            }
        }
    }

    private void verifyTelegramCode(String authCode, String chatId) {
        try {
            telegramIntegrationService.updateChatIdByCode(authCode, chatId);
            sendMessageToTelegram(chatId, "Telegram 연동이 완료되었습니다! 이제 알림을 받을 수 있습니다.");
        } catch (RuntimeException e) {
            sendMessageToTelegram(chatId, "잘못된 인증코드입니다. 다시 시도해주세요.");
        }
    }

    private void sendMessageToTelegram(String chatId, String message) {
        String url = String.format("%s%s/sendMessage?chat_id=%s&text=%s", TELEGRAM_API_URL, botToken, chatId, message);
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(url, String.class);
    }
}
