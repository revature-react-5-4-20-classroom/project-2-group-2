package com.store.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.main.models.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

}
