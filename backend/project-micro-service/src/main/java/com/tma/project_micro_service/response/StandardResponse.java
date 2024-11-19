package com.tma.project_micro_service.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StandardResponse<T> {

  private HttpStatus httpStatus;
  private int statusCode;
  private String message;
  private LocalDateTime timeStamp;
  private String path;
  private T data;
	
}

