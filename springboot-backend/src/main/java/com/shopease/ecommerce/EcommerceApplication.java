package com.shopease.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"com.shopease.ecommerce", "com.shopease.controller", "com.shopease.service", "com.shopease.repository", "com.shopease.config", "com.shopease.model", "com.shopease.request", "com.shopease.response", "com.shopease.exception"})
@EnableJpaRepositories(basePackages = "com.shopease.repository")
@EntityScan(basePackages = "com.shopease.model")
public class EcommerceApplication {

	public static void main(String[] args) {

		SpringApplication.run(EcommerceApplication.class, args);

	}

}
