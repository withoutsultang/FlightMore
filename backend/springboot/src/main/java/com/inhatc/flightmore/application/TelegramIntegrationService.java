package com.inhatc.flightmore.application;

import com.inhatc.flightmore.domain.NaverMember;
import com.inhatc.flightmore.domain.NaverMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TelegramIntegrationService {

    @Autowired
    private NaverMemberRepository naverMemberRepository;

    // 무작위 인증키 생성
    @Transactional
    public String generateRandomCodeForMember(Long memberId) {
        Optional<NaverMember> optionalMember = naverMemberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new RuntimeException("회원정보 없음/ ID: " + memberId);
        }

        NaverMember member = optionalMember.get();

        // telegramCode가 이미 존재하는 경우 기존 코드 업데이트, 존재하지 않으면 새로 생성
        String randomCode;
        if (member.getTelegramCode() != null && !member.getTelegramCode().isEmpty()) {
            randomCode = UUID.randomUUID().toString().substring(0, 8); // 새로운 인증코드 생성
            member.setTelegramCode(randomCode);
        } else {
            randomCode = UUID.randomUUID().toString().substring(0, 8); // 새로운 인증코드 생성
            member.setTelegramCode(randomCode);
        }

        naverMemberRepository.save(member);

        return randomCode;
    }


    // 인증코드를 통해 chatId 업데이트
    public void updateChatIdByCode(String code, String chatId) {
        Optional<NaverMember> optionalMember = naverMemberRepository.findByTelegramCode(code);
        if (optionalMember.isEmpty()) {
            throw new RuntimeException("텔레그램 코드 불일치: " + code);
        }

        NaverMember member = optionalMember.get();
        member.setChatId(chatId);
        member.setTelegramCode(null); // 인증 후 인증코드는 사용되지 않으므로 제거
        naverMemberRepository.save(member);
    }

    // chatId 제거 (연결 해제)
    public void removeChatId(Long memberId) {
        Optional<NaverMember> optionalMember = naverMemberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new RuntimeException("회원정보 없음/ ID: " + memberId);
        }

        NaverMember member = optionalMember.get();
        member.setChatId(null);
        naverMemberRepository.save(member);
    }
}
