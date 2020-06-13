package com.store.main.models;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(schema = "public", name = "project2_orders")
public class Order
{
  public Order()
  {
    super();
  }

  public List<Orderline> orderlines;
  
  @Id
  @Column(name = "order_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer orderId;

  @Column(name = "user_id")
  private Integer userId;
  
  @Column(name = "store_id")
  private Integer storeId;
  
  @Column(name = "date_created")
  private LocalDate dateCreated;
  
  @Column(name = "notes")
  private String notes;

  public Integer getOrderId()
  {
    return orderId;
  }

  public void setOrderId(Integer orderId)
  {
    this.orderId = orderId;
  }

  public Integer getUserId()
  {
    return userId;
  }

  public void setUserId(Integer userId)
  {
    this.userId = userId;
  }

  public Integer getStoreId()
  {
    return storeId;
  }

  public void setStoreId(Integer storeId)
  {
    this.storeId = storeId;
  }

  public LocalDate getDateCreated()
  {
    return dateCreated;
  }

  public void setDateCreated(LocalDate dateCreated)
  {
    this.dateCreated = dateCreated;
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












