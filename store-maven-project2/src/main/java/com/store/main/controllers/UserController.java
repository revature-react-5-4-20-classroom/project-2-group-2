package com.store.main.controllers;



import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.store.main.dtos.Credentials;
import com.store.main.models.User;
import com.store.main.services.UserService;


//We can specify the base url of /users here, then we don't need it on individual methods
// RequestMapping matches all methods

@RestController
public class UserController {
	@Autowired
	UserService userService;
	
	@GetMapping
	public List<User> getAllUsers(){
		return userService.getAll();
	}
	@PostMapping("/newuser")
	public User createNewUser(@RequestBody User user) {
//		user.setUserId(1);
		return userService.create(user);
	}
	
	
	
	@PutMapping("/{id}")
	public User createOrUpdateUserWithId(@RequestBody User user, @PathVariable Integer id) {
		user.setUserId(id);
		return userService.createOrUpdate(user);
		
	}
	@PostMapping("/login")
	public User attemptLogin(@RequestBody Credentials creds, HttpSession session) {
		User loggedInUser =  userService.checkCredentials(creds.getUsername(), creds.getPassword());
		
		//session.setAttribute("isLoggedIn", isLoggedIn);
		
		return loggedInUser;
	}
}
