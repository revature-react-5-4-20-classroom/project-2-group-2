package com.store.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.store.main.exceptions.ItemNotFoundException;
import com.store.main.models.Item;
import com.store.main.services.ItemService;

@RestController
public class ItemController {
	
	@Autowired
	ItemService itemService;
	
	// get all items
	@CrossOrigin(origins = "*")
	@GetMapping("/items")
	public List<Item> getAllItems() {
		return itemService.getAll();
	}
	
	// get item by id
	@CrossOrigin(origins = "*")
	@GetMapping("/items/itemId/{id}")
	public Item getItemById(@PathVariable Integer id) {
		try {
			return itemService.getById(id);
		} catch(ItemNotFoundException e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found", e);
		}
	}
	
	// getting items by category id
//	@GetMapping("/items/category/{catId}")
//	public List<Item> getItemsByCategory(@PathVariable Integer catId) {
//		try {
//			return itemService.getByCategory(catId);
//		} catch(RuntimeException e) {
//			e.printStackTrace();
//			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue finding items", e);
//		}
//	}
	@CrossOrigin(origins = "*")
	@GetMapping("/items/category/{catId}")
	public List<Item> getItemsByCategoryId(@PathVariable Integer catId) {
		try {
			//System.out.println(itemService.getByCategoryId(catId));
			return itemService.getByCategoryId(catId);
		} catch(RuntimeException e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue finding items", e);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PatchMapping("/items/itemId/{id}")
	public Item updateItemWithId(@RequestBody Item item, @PathVariable Integer id) {
		item.setItemId(id);
		return itemService.update(item);
	}
}
