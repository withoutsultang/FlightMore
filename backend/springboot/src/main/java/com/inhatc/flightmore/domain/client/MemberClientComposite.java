package com.inhatc.flightmore.domain.client;

import com.inhatc.flightmore.domain.NaverMember;
import com.inhatc.flightmore.domain.ServerType;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class MemberClientComposite {
    private final Map<ServerType, MemberClient> mapping;

    public MemberClientComposite(Set<MemberClient> clients) {
        this.mapping = clients.stream()
                .collect(Collectors.toMap(MemberClient::spportServer, Function.identity()));
    }

    public NaverMember fetch(ServerType serverType, String code) {
        return getClient(serverType).fetch(code);
    }

    public NaverMember logout(ServerType serverType, String code) {
        return getClient(serverType).delete(code);
    }

    private MemberClient getClient(ServerType serverType) {
        return Optional.ofNullable(mapping.get(serverType))
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 서버 타입입니다."));
    }
}
