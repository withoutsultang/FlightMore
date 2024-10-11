package com.inhatc.flightmore.infra.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.inhatc.flightmore.domain.NaverId;
import com.inhatc.flightmore.domain.NaverMember;
import com.inhatc.flightmore.domain.ServerType;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record NaverMemeberResponse(
        String access_token,
        String result,
        String message,
        Response response
) {
    public NaverMember toDomain(){
        return NaverMember.builder()
                .naverId(new NaverId(String.valueOf(response.id), ServerType.NAVER))
                .nickname(response.nickname)
                .email(response.email)
                .name(response.name)
                .profileImageUrl(response.profileImage)
                .build();
    }

    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record Response(
            String id,
            String nickname,
            String name,
            String email,
            String gender,
            String age,
            String birthday,
            String profileImage,
            String birthyear,
            String mobile
    ) {
    }

}
