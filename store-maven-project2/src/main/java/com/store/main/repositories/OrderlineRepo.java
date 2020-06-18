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

  //@Table(schema = "public", name = "project2_orderlines")
  
  //may not work or be needed, maybe
  //@Query("select c from Orderline c order by c.orderId") //HQL
  //List<Orderline> findAllSorted();
}
