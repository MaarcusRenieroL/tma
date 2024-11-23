package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImplementation implements UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}
	
	@Override
	public User updateUser(UUID userId, User user) {
		if (!userRepository.existsById(userId)) {
			return null;
		}
		
		Optional<User> optionalUser = userRepository.findById(userId);
		
		if (optionalUser.isPresent()) {
			User existingUser = optionalUser.get();
			existingUser.setName(user.getName());
			existingUser.setRole(user.getRole());
			existingUser.setEmail(user.getEmail());
			existingUser.setLocation(user.getLocation());
			existingUser.setPassword(user.getPassword());
			
			userRepository.save(existingUser);
			
			return existingUser;
		}
		
		return null;
	}
	
	public void deleteUser(UUID userId) {
		userRepository.deleteById(userId);
	}
	
	public User getUserById(UUID userId) {
		return userRepository.findById(userId).orElse(null);
	}
}
