package com.inhatc.flightmore.domain;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member", uniqueConstraints = {
        @UniqueConstraint(
                name = "id_unique",
                columnNames = {
                        "server_id",
                        "server_type"
                }
        ),
    }
)
@Data
public class NaverMember{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private NaverId naverId;
    private String email;
    private String name;
    private String nickname;
    private String profileImageUrl;

    // Telegram 연동을 위한 필드 추가
    private String chatId;       // Telegram 채팅 ID
    private String telegramCode; // 사용자가 연동을 위해 입력하는 무작위 코드

    @Override
    public String toString() {
        return "NaverMember{" +
                "id=" + id +
                ", naverId=" + naverId +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                ", chatId='" + chatId + '\'' +
                ", telegramCode='" + telegramCode + '\'' +
                '}';
    }

    public Long id() {
        return id;
    }

    public NaverId naverId() {
        return naverId;
    }

    public String email() {
        return email;
    }

    public String name() {
        return name;
    }

    public String nickname() {
        return nickname;
    }

    public String profileImageUrl() {
        return profileImageUrl;
    }

    // chatId와 telegramCode에 대한 Setter 추가
    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public void setTelegramCode(String telegramCode) {
        this.telegramCode = telegramCode;
    }
}

