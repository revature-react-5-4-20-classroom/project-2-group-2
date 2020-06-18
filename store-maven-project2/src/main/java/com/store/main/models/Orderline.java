package com.store.main.models;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(schema = "public", name = "project2_orderline")
public class Orderline
{
    @Id
    @Column(name = "orderline_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer orderlineId;
    
    @Column(name = "order_id")
    public Integer orderId;
    
    @Column(name = "item_id")
    public Integer itemId;
    
    @Column(name = "user_id")
    public Integer userId;
    
    @Column(name = "date_created")
    public LocalDate dateCreated;
    
    @Column(name = "quantity")
    public Integer quantity;
    
    @Column(name = "notes")
    public String notes;

    public Orderline()
    {
      super();
    }
    
    
    
    public Orderline(
        Integer orderlineId, 
        Integer orderId, 
        Integer itemId, 
        Integer userId,
        LocalDate dateCreated, 
        Integer quantity, 
        String notes)
    {
      super();
      this.orderlineId = orderlineId;
      this.orderId = orderId;
      this.itemId = itemId;
      this.userId = userId;
      this.dateCreated = dateCreated;
      this.quantity = quantity;
      this.notes = notes;
    }



    public Integer getOrderlineId()
    {
      return orderlineId;
    }

    public void setOrderlineId(Integer orderlineId)
    {
      this.orderlineId = orderlineId;
    }

    public Integer getOrderId()
    {
      return orderId;
    }

    public void setOrderId(Integer orderId)
    {
      this.orderId = orderId;
    }

    public Integer getItemId()
    {
      return itemId;
    }

    public void setItemId(Integer itemId)
    {
      this.itemId = itemId;
    }

    public Integer getUserId()
    {
      return userId;
    }

    public void setUserId(Integer userId)
    {
      this.userId = userId;
    }

    public LocalDate getDateCreated()
    {
      return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated)
    {
      this.dateCreated = dateCreated;
    }

    public Integer getQuantity()
    {
      return quantity;
    }

    public void setQuantity(Integer quantity)
    {
      this.quantity = quantity;
    }

    public String getNotes()
    {
      return notes;
    }

    public void setNotes(String notes)
    {
      this.notes = notes;
    }
    
    
}
