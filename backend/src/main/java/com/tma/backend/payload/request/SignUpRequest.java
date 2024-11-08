package com.tma.backend.payload.request;

import jakarta.validation.constraints.*;
import java.util.Set;
import lombok.Data;

@Data
public class SignUpRequest {

  @NotBlank
  @Size(min = 3, max = 20)
  private String userName;

  @NotBlank @Email private String email;

  private Set<String> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;
}
