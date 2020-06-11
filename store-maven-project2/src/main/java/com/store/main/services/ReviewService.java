package com.store.main.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.main.models.Review;
import com.store.main.repositories.ReviewRepository;

@Service
public class ReviewService {
	@Autowired
	ReviewRepository reviewRepository;
	
	public List<Review> getAll(){
		return reviewRepository.findAll();
	}
	
	public Review create(Review review) {
		return reviewRepository.save(review);
	}
}
