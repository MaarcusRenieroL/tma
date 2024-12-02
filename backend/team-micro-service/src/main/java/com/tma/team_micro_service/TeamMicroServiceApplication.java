package com.tma.team_micro_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class TeamMicroServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(TeamMicroServiceApplication.class, args);
  }
}
