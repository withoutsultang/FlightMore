package com.inhatc.flightmore.presentation;
import com.inhatc.flightmore.domain.ServerType;
import org.springframework.core.convert.converter.Converter;

public class ServerConverter implements Converter<String, ServerType> {
    @Override
    public ServerType convert(String source) {
        return ServerType.fromName(source);
    }
}