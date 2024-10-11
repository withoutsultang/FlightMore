package com.inhatc.flightmore.infra;

import com.inhatc.flightmore.domain.NaverMember;
import com.inhatc.flightmore.domain.ServerType;
import com.inhatc.flightmore.domain.client.MemberClient;
import com.inhatc.flightmore.infra.client.NaverApiClient;
import com.inhatc.flightmore.infra.dto.NaverMemeberResponse;
import com.inhatc.flightmore.infra.dto.NaverToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class NaverMemberClient implements MemberClient {
    private final NaverApiClient naverApiClient;
    private final NaverConfig naverConfig;

    @Override
    public ServerType spportServer() {
        return ServerType.NAVER;
    }

    @Override
    public NaverMember fetch(String code){
        NaverToken token = naverApiClient.fetchToken(tokenRequestParam(code, "authorization_code"));
        NaverMemeberResponse response = naverApiClient.fetchMember("Bearer " + token.accessToken());
        return response.toDomain();
    }

    @Override
    public NaverMember delete(String code){
        NaverMemeberResponse response = naverApiClient.deleteToken(tokenRequestParam(code,"delete" ));
        return response.toDomain();
    }

    private MultiValueMap<String, String> tokenRequestParam(String code, String type) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", type);
        params.add("client_id", naverConfig.clientId());
        params.add("client_secret", naverConfig.clientSecret());
        params.add("code", code);
        params.add("state", naverConfig.state());
        return params;
    }


}
