package com.inhatc.flightmore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAsync
@SpringBootApplication
@ConfigurationPropertiesScan
@EnableScheduling
public class FlightmoreApplication
{
	public static void main(String[] args) {

		SpringApplication.run(FlightmoreApplication.class, args);
	}
}
