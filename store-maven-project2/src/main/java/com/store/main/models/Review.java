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
	private Integer review_id;
	
	@Column(name="user_id")
	private Integer user_id;
	
	@Column(name="rating")
	private Integer rating;
	
	@Column(name="content")
	private String content;
	
	@Column(name="item_id")
	private Integer item_id;

	
	public Review() {
		
	}
	public Review(Integer review_id, Integer user_id, Integer rating, String content, Integer item_id) {
		super();
		this.review_id = review_id;
		this.user_id = user_id;
		this.rating = rating;
		this.content = content;
		this.item_id = item_id;
	}

	public Integer getReview_id() {
		return review_id;
	}

	public void setReview_id(Integer review_id) {
		this.review_id = review_id;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
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

	public Integer getItem_id() {
		return item_id;
	}

	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}

	@Override
	public String toString() {
		return "Review [review_id=" + review_id + ", user_id=" + user_id + ", rating=" + rating + ", content=" + content
				+ ", item_id=" + item_id + "]";
	}

	
	
	
	
}
