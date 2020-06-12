package com.store.main.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import com.store.main.models.Orderline;
import com.store.main.repositories.OrderRepo;

@Service
@Primary
public class OrderService
{
    @Autowired
    OrderRepo orderRepo;
    
    public List<Orderline> getAll()
    {
        return orderRepo.findAll();
    }
    
    public Orderline save(Orderline ol)
    {
      return orderRepo.save(ol);
    }
}