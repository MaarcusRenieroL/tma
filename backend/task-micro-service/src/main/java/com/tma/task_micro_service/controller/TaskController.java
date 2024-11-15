package com.tma.task_micro_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  @GetMapping("/")
  public String greeting() {
    return "Greetings from Spring Boot!";
  }
}
