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
import com.store.main.models.Orderline;
import com.store.main.services.OrderService;

@RestController
public class OrderController
{
    @Autowired
    OrderService orderService;
    
    @CrossOrigin(origins = "*")
    @GetMapping("/orders")
    public List <Orderline> getAll()
    {
      System.out.println("GET /orders has been hit");
      
        return orderService.getAll();
    }
    
    /*
     *  Posts a new orderline to the orderlines table
     *  ann orderline is one item in an order
     *  the following fields must be passed in the body of the request
          "orderId":1
          "itemId":2
          "userId":2
          "quantity":100 
          "notes":"notes notes notes "
          
         returns:
           The new orderline when it is successful.
           null when there was not enough information to create an orderline
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/orders")
    public Orderline addNewCat(@RequestBody Orderline ol)
    {
        System.out.println("POST /orders has been hit");
        System.out.println("ol="+ol.toString());
        
        if(ol.orderId==null)
        {
            System.out.println("orderId was null is the request");
            return null;
        }
        
        if(ol.itemId==null)
        {
            System.out.println("itemId was null is the request");
            return null;
        }
        
        if(ol.userId==null)
        {
            System.out.println("userId was null is the request");
            return null;
        }

        if(ol.quantity==null)
        {
            System.out.println("quantity was null is the request");
            return null;
        }
        
        if(ol.notes==null)
        {
            System.out.println("notes was null is the request");
            return null;
        }
        
        ol.dateCreated=LocalDate.now();

//            orderlineId
//            orderId
//            itemId
//            userId
//            dateCreated
//            quantity
//            notes
            
        return orderService.save(ol);
    }
    
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














