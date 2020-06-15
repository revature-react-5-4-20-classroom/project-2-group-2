package com.store.main.services;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.main.exceptions.UserNotFound;
import com.store.main.models.User;
import com.store.main.repositories.UserRepository;

//Its good practice to make Interfaces for your services, but not strictly necessary. Just less modular
@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	
	public List<User> getAll(){
		return userRepository.findAll();
	}
	

	public User create(User user) {
		return userRepository.save(user);
	}
	
	public User update(User user) {
		Optional<User> existingUser = userRepository.findById(user.getUserId());
		if(existingUser.isPresent()) {
			return userRepository.save(user);
		} else {
			throw new UserNotFound();
		}
	}
	public User checkCredentials(String username, String password) {
		// we just want to check if this username and password exist in the db
		List<User> loggedInUserList = userRepository.checkUsernamePassword(username, password);
		if(loggedInUserList.size() > 0) {
			User loggedInUser = loggedInUserList.get(0);
			return loggedInUser;
		} else {
			throw new UserNotFound();
		}
	}
	
	public User createOrUpdate(User user) {
		return userRepository.save(user);
	}
	
	public void delete(Integer id) {
		userRepository.deleteById(id);
	}
}
