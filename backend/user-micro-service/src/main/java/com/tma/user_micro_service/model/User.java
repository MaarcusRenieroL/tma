package com.tma.user_micro_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name = "users",
    uniqueConstraints = {
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email")
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @NotBlank(message = "Username cannot be blank")
  @Size(max = 20, message = "Username must not exceed 20 characters")
  @Pattern(
      regexp = "^[a-zA-Z0-9_]*$",
      message = "Username can only contain alphanumeric characters and underscores")
  @Column(name = "username")
  private String userName;

  @NotBlank(message = "Email cannot be blank")
  @Size(max = 50, message = "Email must not exceed 50 characters")
  @Email(message = "Invalid email format")
  @Column(name = "email")
  private String email;

  @NotBlank(message = "Password cannot be blank")
  @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
  @JsonIgnore
  @Column(name = "password")
  private String password;

  @Size(max = 100, message = "Name must not exceed 100 characters")
  private String name;

  @Size(max = 100, message = "Location must not exceed 100 characters")
  private String location;

  private boolean accountNonLocked = false;

  private boolean accountNonExpired = false;

  private boolean credentialsNonExpired = false;

  private boolean enabled = true;

  @FutureOrPresent(message = "Credentials expiry date must be in the future or present")
  private LocalDate credentialsExpiryDate;

  @FutureOrPresent(message = "Account expiry date must be in the future or present")
  private LocalDate accountExpiryDate;

  @Size(max = 32, message = "Two-factor secret must not exceed 32 characters")
  private String twoFactorSecret;

  private boolean isTwoFactorEnabled = false;

  @NotBlank(message = "Sign-up method cannot be blank")
  @Pattern(
      regexp = "^(LOCAL|GOOGLE|FACEBOOK|APPLE|EMAIL)$",
      message = "Sign-up method must be one of LOCAL, GOOGLE, FACEBOOK, APPLE or EMAIL")
  private String signUpMethod;

  @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
  @JoinColumn(name = "role_id", referencedColumnName = "role_id")
  @JsonBackReference
  @ToString.Exclude
  private Role role;

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdDate;

  @UpdateTimestamp private LocalDateTime updatedDate;

  public User(String userName, String password, String email) {
    this.userName = userName;
    this.password = password;
    this.email = email;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof User)) {
      return false;
    }
    return userId != null && userId.equals(((User) o).getUserId());
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
