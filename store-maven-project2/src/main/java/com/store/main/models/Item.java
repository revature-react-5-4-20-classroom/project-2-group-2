package com.store.main.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// Item class - corresponds to project2_items in db
@Entity
@Table(schema = "public", name = "project2_items")
public class Item {
	
	@Id
	@Column(name = "item_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer itemId;
	
	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "price")
	private Double price;
	
	@Column(name = "description")
	private String description;
	
	// Many to one relationship with category - For now, just use a simple integer
//	@JoinColumn(name = "category_id")
//	@ManyToOne(fetch = FetchType.EAGER)
//	@JsonIgnoreProperties({"items"}) // This may not be necessary
//	private Category category;
	@Column(name = "category_id")
	private Integer categoryId;
	
	@Column(name = "avg_rating")
	private Float avgRating;
	
	@Column(name = "img_path")
	private String imgPath;
	
	// Getters and Setters
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
//	public Category getCategory() {
//		return category;
//	}
//	public void setCategory(Category category) {
//		this.category = category;
//	}
	public Float getAvgRating() {
		return avgRating;
	}
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public void setAvgRating(Float avgRating) {
		this.avgRating = avgRating;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	
	// toString()
	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", itemName=" + itemName + ", price=" + price + ", description=" + description
				+ ", categoryId=" + categoryId + ", avgRating=" + avgRating + ", imgPath=" + imgPath + "]";
	}
	
	

}
