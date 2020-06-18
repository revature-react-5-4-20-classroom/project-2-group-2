package com.store.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.store.main.models.Item;
import com.store.main.models.Order;

public interface ItemRepository extends JpaRepository<Item, Integer> 
{
    //we now have basic CRUD methods
    
    //findBy is special
    Item findByItemId(Integer itemId);
  
	//List<Item> findByCategory(Integer catId); // 90% sure this won't work)
	
	List<Item> findByCategoryId(Integer catId);
	
	@Query("select i from Item i where i.itemName like %:param% order by i.categoryId")
	List<Item> findBySearchParam(String param);
	
}
