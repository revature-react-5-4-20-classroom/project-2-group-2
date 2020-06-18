package com.store.main.repositories;

import java.util.List;
import javax.persistence.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import com.store.main.controllers.OrderController;
import com.store.main.models.Order;
import com.store.main.models.Orderline;

@Repository
public interface OrderlineRepo extends JpaRepository<Orderline, Integer>
{
  //we now have CRUD methods
  
  //findBy is special
  Orderline findByOrderId(Integer orderlineId);

  
  @Query("select x from Orderline x where x.orderId=:orderId") //HQL
  List<Orderline> findAllByOrderId(Integer orderId);
}
