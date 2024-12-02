package com.tma.user_micro_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
@EnableDiscoveryClient
@EnableFeignClients
public class UserMicroServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(UserMicroServiceApplication.class, args);
  }
}
