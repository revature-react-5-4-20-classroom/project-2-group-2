package com.store.main.controllers;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.store.main.models.Item;
import com.store.main.models.Order;
import com.store.main.models.OrderFromClient;
import com.store.main.models.Orderline;
import com.store.main.repositories.ItemRepository;
import com.store.main.repositories.OrderlineRepo;
import com.store.main.services.OrderService;
import com.store.main.services.OrderlineService;

@RestController
public class OrderController
{
    @Autowired
    OrderService orderService;
    
    @Autowired
    OrderlineService orderlineService;
    
    @Autowired
    OrderlineRepo orderlineRepo; //maybe go straight to the repo and nevermind services
    
    @Autowired
    ItemRepository itemRepo;
    
    //GETS all the orders in the orders table
    @CrossOrigin(origins = "*")
    @GetMapping("/orderAll")
    public List <Order> getAll()
    {
        System.out.println("GET /orders has been hit");
      
        return orderService.getAll();
    }
    
    //POSTS a new order to the database
    /*  Accepts an order in the request body in the following form:
     *    {
              "notes":"These are notes for the order",
              "userId":1
              "itemIds":[13,14]
          }
          
        responds:
          with the id of the new order that was placed
          -1 when there was a failure
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/orderItems")//post all the items to a new order. purchasing
    public Integer addNewOrder(@RequestBody OrderFromClient ord)
    {
      System.out.println("POST /orderItems has been reached");
      System.out.println("ord="+ord.toString());
      
      if(ord.notes==null)       
      {
        System.out.println("notes="+ord.notes);
        System.out.println("Could not place order, notes was not in request body");
        return -1;
      }
      
      if(ord.userId==null)       
      {
        System.out.println("userId="+ord.userId);
        System.out.println("Could not place order, userId was not in request body");
        return -1;
      }
      
      if(ord.itemIds==null)     
      {
        System.out.println("itemIds="+ord.itemIds);
        System.out.println("Could not place order, itemIds were not in request body");
        return -1;
      }

      //create an order and put it in the database
      Order newOrder=new Order(
            0,              //Integer orderId. 0 uses default primary key
            ord.userId,     //Integer userId, 
            1,              //Integer storeId, 
            LocalDate.now(),//LocalDate dateCreated,
            ord.notes       //String notes
          );
      
      newOrder=orderService.orderRepo.save(newOrder);
      
      //create the orderlines and put those in the database
      int newOrderId=newOrder.getOrderId();
      
      System.out.println("newOrderId="+newOrderId);
      
      for(int itemId:ord.itemIds)
      {
        Orderline newOrderline=new Orderline(
              0,                //Integer orderlineId.  0 uses default primary key
              newOrderId,       //Integer orderId, 
              itemId,           //Integer itemId, 
              ord.userId,       //Integer userId,
              LocalDate.now(),  //LocalDate dateCreated, 
              1,                    //Integer quantity, 
              "backend test notes"  //String notes
            );
        
        orderlineService.orderlineRepo.save(newOrderline);
      }
      
      return newOrderId;
    }
    
    //GETS a single order by order_id
    @CrossOrigin(origins = "*")
    @GetMapping("/orderOne/{id}")
    public Order getOneWithId(@PathVariable Integer id)
    {
      return orderService.orderRepo.findByOrderId(id);
    }
    
    //GETS all orders by user_id
    @CrossOrigin(origins = "*")
    @GetMapping("/orderAll/{userId}")
    public List<Order> getAllWithId(@PathVariable Integer userId)
    {
      return orderService.orderRepo.findAllByUserId(userId);
    }
    
    //GETS all items by order_id [ {itemObject}, {itemObject} ]
    @CrossOrigin(origins = "*")
    @GetMapping("/orderItems/{orderId}")
    public List<Item> getAllItemsByOrderId(@PathVariable Integer orderId)
    {
      List<Orderline> ordLines=orderlineRepo.findAllByOrderId(orderId);
      
      //get each item using each orderline, no time to come up with a better way
      List<Item> itemsInAnOrder=new ArrayList<Item>();
      
      for(Orderline ordLine:ordLines)
      {
        Item itemInOrderline=itemRepo.findByItemId(ordLine.itemId);
        itemsInAnOrder.add(itemInOrderline);
      }
      
      return itemsInAnOrder;
    }
    
    //GETS all orerlines in the orderline table
    @CrossOrigin(origins = "*")
    @GetMapping("/orders/items")
    public Orderline getAllOrderlines()
    {
      System.out.println("GET /orders/items has been hit");
      
      Orderline aNewRow=new Orderline();
      aNewRow.orderlineId=1;
      aNewRow.orderId=1;
      aNewRow.itemId=1;
      
      System.out.println(" aNewRow="+aNewRow);

      return aNewRow;
    }
}














