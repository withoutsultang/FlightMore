package com.inhatc.flightmore.presentation;

import com.inhatc.flightmore.application.TelegramIntegrationService;
import com.inhatc.flightmore.infra.dto.AuthKeyResponse;
import com.inhatc.flightmore.infra.dto.DisconnectRequest;
import com.inhatc.flightmore.infra.dto.GenerateKeyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/telegram")
public class TelegramIntegrationController {

    @Autowired
    private TelegramIntegrationService telegramIntegrationService;

    // 인증키 생성
    @PostMapping("/generate-key")
        public ResponseEntity<?> generateAuthKey(@RequestBody GenerateKeyRequest request) {
        String authKey = telegramIntegrationService.generateRandomCodeForMember(request.getMemberId());
        return ResponseEntity.ok(new AuthKeyResponse(authKey));
    }

    // Telegram 연결 해제
    @PostMapping("/disconnect")
    public ResponseEntity<?> disconnectTelegram(@RequestBody DisconnectRequest request) {
        telegramIntegrationService.removeChatId(request.getMemberId());
        return ResponseEntity.ok().build();
    }
}
