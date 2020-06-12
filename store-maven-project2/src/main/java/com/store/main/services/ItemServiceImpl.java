package com.store.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.store.main.exceptions.ItemNotFoundException;
import com.store.main.models.Item;
import com.store.main.repositories.ItemRepository;

//The real implementation of Item Service
@Service
@Primary
public class ItemServiceImpl implements ItemService {
	
	@Autowired
	ItemRepository itemRepository;

	@Override
	public List<Item> getAll() {
		return itemRepository.findAll();
	}

	@Override
	public Item getById(Integer id) {
		Optional<Item> item = itemRepository.findById(id);
		if(item.isPresent()) {
			return item.get();
		} else {
			throw new ItemNotFoundException();
		}
	}

//	@Override
//	public List<Item> getByCategory(Integer catId) {
//		return itemRepository.findByCategory(catId);
//	}
	@Override
	public List<Item> getByCategoryId(Integer catId) {
		return itemRepository.findByCategoryId(catId);
	}

	@Override
	public Item update(Item item) {
		// TODO Auto-generated method stub
		return null;
	}

}
