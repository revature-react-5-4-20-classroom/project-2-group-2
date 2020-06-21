package com.store.main.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.store.main.models.Order;
import com.store.main.models.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> 
{
  //We have CRUD
  
  @Query("select c from Review c where c.itemId=:id") //HQL
  List<Review> findAllByItemId(Integer id);
}
