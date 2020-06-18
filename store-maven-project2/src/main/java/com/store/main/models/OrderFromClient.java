package com.store.main.models;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/*
 * The order data from the client when making a purchase.
 * this is not the same as the order in the database table.
 */
public class OrderFromClient
{
  public String notes;          //the special notes for the order
  public Integer userId;        //the userId that is placing the order.
  public List<Integer> itemIds; //the item ids that the order is made up of
  
  @Override
  public String toString()
  {
    return "OrderFromClient={notes:'" + notes + "',itemIds:"+itemIds+"}";
  }
}
