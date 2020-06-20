package com.store.main.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(schema = "public", name="project2_reviews")
public class Review {
	@Id
	@Column(name="review_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer reviewId;
	
	@Column(name="user_id")
	public Integer userId;
	
	@Column(name="rating")
	public Integer rating;
	
	@Column(name="content")
	public String content;
	
	@Column(name="item_id")
	public Integer itemId;

	
	public Review() {
		
	}
	public Review(Integer reviewId, Integer userId, Integer rating, String content, Integer itemId) {
		super();
		this.reviewId = reviewId;
		this.userId = userId;
		this.rating = rating;
		this.content = content;
		this.itemId = itemId;
	}

	public Integer getReviewId() {
		return reviewId;
	}

	public void setReviewId(Integer reviewId) {
		this.reviewId = reviewId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUser_id(Integer userId) {
		this.userId = userId;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItem_id(Integer itemId) {
		this.itemId = itemId;
	}

	@Override
	public String toString() {
		return "Review {reviewId=" + reviewId + ", userId=" + userId + ", rating=" + rating + ", content=" + content
				+ ", itemId=" + itemId + "}";
	}

	
	
	
	
}
