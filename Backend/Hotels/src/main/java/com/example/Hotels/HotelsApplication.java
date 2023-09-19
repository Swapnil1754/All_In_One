package com.example.Hotels;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class HotelsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelsApplication.class, args);
	}

}
