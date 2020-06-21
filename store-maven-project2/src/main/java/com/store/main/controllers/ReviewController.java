package com.store.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.store.main.models.Review;
import com.store.main.repositories.ReviewRepository;
import com.store.main.services.ReviewService;

@RestController
public class ReviewController 
{
	@Autowired
	ReviewService reviewService;
	
	@Autowired
	ReviewRepository reviewRepo;
	
	@GetMapping("/hello")
	public String test() {
		return "hello";
	}
	
	@GetMapping("/reviews")
	public List<Review> getAllReviews(){
		return reviewService.getAll();
	}
	
	@GetMapping("/reviews/{itemId}")
    public List<Review> getAllReviews(@PathVariable Integer itemId)
	{
	    
	    
        return reviewRepo.findAllByItemId(itemId);
	}
	
	//this endpoint was /reviews but the front end was hitting /review
	@PostMapping(path="/review", consumes = "application/json")
	public Review addNewReview(@RequestBody Review review) 
	{
	    System.out.println("addNewReview() was reached");
	    System.out.println("review="+review);
	    
	    //clamp the rating between 1 and 5
	    review.rating=Math.min(Math.max(1, review.rating),5);
	    System.out.println("review="+review);
	    
		Review newReview=reviewService.create(review);
		 System.out.println("newReview="+newReview);
		
		return newReview;
	}
}











