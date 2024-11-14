package com.tma.user_micro_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @GetMapping
  public String greetings() {
    return "Greetings from Spring Boot!";
  }
}
