package com.tma.user_micro_service.service.implementation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tma.user_micro_service.model.User;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@NoArgsConstructor
@Data
public class UserDetailsImplementation implements UserDetails {

  private static final long serialVersionUID = 1L;

  private UUID userId;

  private String userName;

  private String email;

  @JsonIgnore private String password;

  private Collection<? extends GrantedAuthority> authorities;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return userName;
  }

  public UserDetailsImplementation(
      UUID userId,
      String userName,
      String email,
      String password,
      Collection<? extends GrantedAuthority> authorities) {
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static UserDetailsImplementation build(User user) {
    GrantedAuthority authority =
        new SimpleGrantedAuthority(user.getRole().getRoleName().toString());
    return new UserDetailsImplementation(
        user.getUserId(),
        user.getUserName(),
        user.getEmail(),
        user.getPassword(),
        List.of(authority));
  }
}
