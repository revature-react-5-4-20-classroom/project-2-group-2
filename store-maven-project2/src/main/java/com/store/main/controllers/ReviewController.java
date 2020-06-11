package com.store.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.main.models.Review;
import com.store.main.services.ReviewService;

@RestController
public class ReviewController {

	
	@Autowired
	ReviewService reviewService;
	
	@GetMapping("/hello")
	public String test() {
		return "hello";
	}
	
	@GetMapping("/reviews")
	public List<Review> getAllReviews(){
		return reviewService.getAll();
	}
	
	@PostMapping(path="/reviews", consumes = "application/json")
	public Review addNewReview(@RequestBody Review review) {
		return reviewService.create(review);
	}
}
