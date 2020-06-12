package com.store.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.store.main.models.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
	//List<Item> findByCategory(Integer catId); // 90% sure this won't work)
	
	List<Item> findByCategoryId(Integer catId);
	
}
