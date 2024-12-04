package com.tma.organization_micro_service.payload.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

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
