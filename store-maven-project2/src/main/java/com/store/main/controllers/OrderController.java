package com.store.main.controllers;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.store.main.models.Item;
import com.store.main.models.Order;
import com.store.main.models.OrderFromClient;
import com.store.main.models.Orderline;
import com.store.main.services.OrderService;
import com.store.main.services.OrderlineService;

@RestController
public class OrderController
{
    @Autowired
    OrderService orderService;
    
    @Autowired
    OrderlineService orderlineService;
    
    @CrossOrigin(origins = "*")
    @GetMapping("/orders")//get all the orders to view them
    public List <Order> getAll()
    {
        System.out.println("GET /orders has been hit");
      
        return orderService.getAll();
    }
    
    /*
     *  Accepts an order in the request body in the following form:
     *    {
              "notes":"These are notes for the order",
              "userId":1
              "itemIds":[13,14]
          }
          
        responds with a message of what happened when placing the order
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/orderItems")//post all the items to a new order. purchasing
    public String addNewOrder(@RequestBody OrderFromClient ord)
    {
      System.out.println("POST /orderItems has been reached");
      System.out.println("ord="+ord.toString());
      
      if(ord.notes==null)       
      {
        System.out.println("notes="+ord.notes);
        return "Could not place order, notes was not in request body";
      }
      
      if(ord.userId==null)       
      {
        System.out.println("userId="+ord.userId);
        return "Could not place order, userId was not in request body";
      }
      
      if(ord.itemIds==null)     
      {
        System.out.println("itemIds="+ord.itemIds);
        return "Could not place order, itemIds were not in request body";
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
      
      return "Your order was placed successfully";
    }
    
    /*
     *  Posts a new orderline to the orderlines table
     *  an orderline is one item in an order
     *  the following fields must be passed in the body of the request
     *  {
          "orderId":1
          "itemId":2
          "userId":2
          "quantity":100 
          "notes":"notes notes notes "
         }
         
         responds:
           The new orderline when it is successful.
           null when there was not enough information to create an orderline
     */
//    @CrossOrigin(origins = "*")
//    @PostMapping("/orderOneItem")
//    public Orderline addOneOrderline(@RequestBody Orderline ol)
//    {
//        System.out.println("POST /orders has been hit");
//        System.out.println("ol="+ol.toString());
//        
//        if(ol.orderId==null)
//        {
//            System.out.println("orderId was null is the request");
//            return null;
//        }
//        
//        if(ol.itemId==null)
//        {
//            System.out.println("itemId was null is the request");
//            return null;
//        }
//        
//        if(ol.userId==null)
//        {
//            System.out.println("userId was null is the request");
//            return null;
//        }
//
//        if(ol.quantity==null)
//        {
//            System.out.println("quantity was null is the request");
//            return null;
//        }
//        
//        if(ol.notes==null)
//        {
//            System.out.println("notes was null is the request");
//            return null;
//        }
//        
//        ol.dateCreated=LocalDate.now();
//
////            orderlineId
////            orderId
////            itemId
////            userId
////            dateCreated
////            quantity
////            notes
//            
//        return orderService.save(ol);
//    }
//    
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














