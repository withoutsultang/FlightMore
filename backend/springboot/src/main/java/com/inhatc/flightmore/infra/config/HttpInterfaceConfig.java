package com.inhatc.flightmore.infra.config;

import com.inhatc.flightmore.infra.client.NaverApiClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class HttpInterfaceConfig {
    @Bean
    public NaverApiClient naverApiClient() {
        return createHttpInterface(NaverApiClient.class);
    }

    private <T> T createHttpInterface(Class<T> type) {
        WebClient webClient = WebClient.create();
        HttpServiceProxyFactory build = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(webClient)).build();
        return build.createClient(type);
    }
}
