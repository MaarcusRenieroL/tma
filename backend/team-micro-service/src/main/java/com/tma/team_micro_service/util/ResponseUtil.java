package com.tma.team_micro_service.util;

import com.tma.team_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ResponseUtil<T> {
  public ResponseUtil() {}

  public static <T> ResponseEntity<StandardResponse<T>> buildSuccessMessage(
      HttpStatus httpStatus,
      String message,
      T data,
      HttpServletRequest httpServletRequest,
      LocalDateTime timeStamp) {
    return ResponseEntity.status(httpStatus)
        .body(
            new StandardResponse<>(
                httpStatus,
                httpStatus.value(),
                message,
                timeStamp,
                httpServletRequest.getRequestURI(),
                data));
  }

  public static <T> ResponseEntity<StandardResponse<T>> buildErrorMessage(
      HttpStatus httpStatus,
      String message,
      HttpServletRequest httpServletRequest,
      LocalDateTime timeStamp) {
    return ResponseEntity.status(httpStatus)
        .body(
            new StandardResponse<>(
                httpStatus,
                httpStatus.value(),
                message,
                timeStamp,
                httpServletRequest.getRequestURI(),
                null));
  }
}
