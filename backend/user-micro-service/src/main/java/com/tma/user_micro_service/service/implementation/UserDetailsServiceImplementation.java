package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.repository.UserRepository;
import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {

  private UserRepository userRepository;

  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> optionalUser = userRepository.findByUserName(username);

    if (optionalUser.isPresent()) {
      return UserDetailsImplementation.build(optionalUser.get());
    }

    throw new UsernameNotFoundException("User with username " + username + " was not found");
  }
}
