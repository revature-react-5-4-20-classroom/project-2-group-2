package com.store.main.services;

import java.util.List;

import com.store.main.models.Item;

// I'm mainly doing this to match Adam's code, not sure an interface is necessary
public interface ItemService {
	
	List<Item> getAll();
	
	Item getById(Integer id);
	
	//List<Item> getByCategory(Integer catId); // This is too complicated, only implement if we decide to return category objects
	
	List<Item> getByCategoryId(Integer id);
	
	Item update(Item item);
	
	// No creating items for now
}
