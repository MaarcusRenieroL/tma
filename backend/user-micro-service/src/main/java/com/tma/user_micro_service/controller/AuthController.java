package com.tma.user_micro_service.controller;

import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthController {

  @GetMapping("csrf-token")
  public ResponseEntity<StandardResponse<CsrfToken>> getCsrfToken(HttpServletRequest request) {
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "CSRF Token fetched successfully",
        (CsrfToken) request.getAttribute(CsrfToken.class.getName()),
        request,
        LocalDateTime.now());
  }
}
