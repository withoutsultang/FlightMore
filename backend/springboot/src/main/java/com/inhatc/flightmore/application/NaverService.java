package com.inhatc.flightmore.application;

import com.inhatc.flightmore.domain.NaverMember;
import com.inhatc.flightmore.domain.NaverMemberRepository;
import com.inhatc.flightmore.domain.client.MemberClientComposite;
import lombok.RequiredArgsConstructor;
import com.inhatc.flightmore.domain.ServerType;
import com.inhatc.flightmore.domain.CodeRequestUrlProviderComposite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NaverService {
    private static final Logger log = LoggerFactory.getLogger(NaverService.class);
    private final CodeRequestUrlProviderComposite codeRequestUrlProviderComposite;
    private final MemberClientComposite memberClientComposite;
    private final NaverMemberRepository naverMemberRepository;

    public String getCodeRequestUrl(ServerType serverType) {
        String url = codeRequestUrlProviderComposite.provide(serverType);
        System.out.println("Generated Naver URL: " + url);  // 로그로 URL 확인
        return url;
    }

    public NaverMember login(ServerType serverType, String code) {
        NaverMember naverMember = memberClientComposite.fetch(serverType, code);
        NaverMember findMember = naverMemberRepository.findByNaverId(naverMember.naverId())
                .orElseGet(() -> naverMemberRepository.save(naverMember));
        log.info("Returned NaverMember: {}", findMember);
        return findMember;
    }

//    public Long logout(ServerType serverType, String code) {
//        NaverMember naverMember = memberClientComposite.logout(serverType, code);
//        return findMember.id();
//    }



}