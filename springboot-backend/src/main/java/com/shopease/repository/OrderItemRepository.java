package com.shopease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shopease.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long>{

    public List<OrderItem> findByOrderId(Long orderId);

}
