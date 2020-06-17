package com.store.main.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import com.store.main.models.Orderline;
import com.store.main.repositories.OrderlineRepo;

@Service
@Primary
public class OrderlineService 
{
    @Autowired
    public OrderlineRepo orderlineRepo;
    
    public List<Orderline> getAll()
    {
        return orderlineRepo.findAll();
    }
    
    public Orderline save(Orderline ol)
    {
      return orderlineRepo.save(ol);
    }
}











