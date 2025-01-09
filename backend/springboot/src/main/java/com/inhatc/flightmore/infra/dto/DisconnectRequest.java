package com.inhatc.flightmore.infra.dto;

public class DisconnectRequest {
    private Long memberId;

    // 기본 생성자
    public DisconnectRequest() {
    }

    // Getter와 Setter
    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }
}
