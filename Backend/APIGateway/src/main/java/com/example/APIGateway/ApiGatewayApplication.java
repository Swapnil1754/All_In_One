package com.example.APIGateway;

import com.example.APIGateway.Filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
	@Bean
	public RouteLocator routes(RouteLocatorBuilder builder){
		return builder.routes().route(p->p.path("/api/v1/**").uri("lb://register-service"))
				.route(p->p.path("/api/hotel/**").uri("lb://hotel-service"))
				.route(p->p.path("/api/owner/**").uri("lb://owner-service"))
				.route(p->p.path("/api/admin/**").uri("lb://admin-service"))
				.route(p->p.path("/api/booking/**").uri("lb://booking-service"))
				.route(p->p.path("/api/email/**").uri("lb://email-service"))
				.route(p->p.path("/api/bus/**").uri("lb://bus-service"))
				.route(p->p.path("/app/notification/v1/**").uri("lb://notification-service"))
				.route(p->p.path("/ws/**").uri("lb://notification-service")).build();
	}
	@Bean
	public FilterRegistrationBean jwtFilter() {
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean<>();
		filterRegistrationBean.setFilter(new JwtFilter());
		filterRegistrationBean.addUrlPatterns("/api/v1/*");
		return filterRegistrationBean;
	}


}
