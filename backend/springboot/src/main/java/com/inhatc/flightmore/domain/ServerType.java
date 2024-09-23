package com.inhatc.flightmore.domain;

import static java.util.Locale.ENGLISH;

public enum ServerType {
    NAVER;

    public static ServerType fromName(String name) {
        return valueOf(name.toUpperCase(ENGLISH));
    }
}
