package com.inhatc.flightmore.domain;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import com.inhatc.flightmore.domain.ServerType;
import org.springframework.stereotype.Component;

@Component
public class CodeRequestUrlProviderComposite {
    private final Map<ServerType, CodeRequestUrlProvider> mapping;

    public CodeRequestUrlProviderComposite(Set<CodeRequestUrlProvider> codeRequestUrlProviders) {
        mapping = codeRequestUrlProviders.stream()
                .collect(toMap(CodeRequestUrlProvider::supportServer, identity()));
    }

    public String provide(ServerType serverType) {
        return getProvider(serverType).provide();
    }

    public CodeRequestUrlProvider getProvider(ServerType serverType) {
        return Optional.ofNullable(mapping.get(serverType))
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 로그인 타입입니다."));
    }
}
