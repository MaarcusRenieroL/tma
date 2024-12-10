package com.tma.user_micro_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
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
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID userId;

  private String userName;

  private String email;

  private String password;

  private String name;

  private String location;

  private boolean isOnboarded = false;

  private boolean isVerified = false;

  private boolean isUserSetupByOrganization = false;

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

  public User(String userName, String password, String email, String name) {
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.name = name;
  }

  public User(String userName, String email, String password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
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

  private UUID organizationId;

  @ElementCollection private Set<UUID> teamIds;

  @ElementCollection private Set<UUID> taskIds;

  @ElementCollection private Set<UUID> projectIds;
}
