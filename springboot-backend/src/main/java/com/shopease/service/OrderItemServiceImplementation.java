package com.shopease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopease.model.OrderItem;
import com.shopease.repository.OrderItemRepository;


@Service
public class OrderItemServiceImplementation implements OrderItemService{

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem addOrderItem(OrderItem orderItem) {
        
        return orderItemRepository.save(orderItem);
        
    }



}
