package com.inhatc.flightmore.infra.dto;

import lombok.Getter;
import lombok.Setter;

public class AuthKeyResponse {
    @Getter @Setter
    private String authKey;

    // 기본 생성자
    public AuthKeyResponse() {
    }

    // 매개변수를 받는 생성자
    public AuthKeyResponse(String authKey) {
        this.authKey = authKey;
    }

//    // Getter
//    public String getAuthKey() {
//        return authKey;
//    }
//
//    // Setter
//    public void setAuthKey(String authKey) {
//        this.authKey = authKey;
//    }
}
