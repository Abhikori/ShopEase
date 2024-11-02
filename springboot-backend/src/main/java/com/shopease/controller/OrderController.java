package com.shopease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopease.exception.OrderException;
import com.shopease.exception.UserException;
import com.shopease.model.Address;
import com.shopease.model.Order;
import com.shopease.model.User;
import com.shopease.service.OrderService;
import com.shopease.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress, @RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.createOrder(user, shippingAddress);
        return new ResponseEntity<Order>(order,HttpStatus.CREATED);
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Order> orders = orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findOrderById(@PathVariable("Id") Long orderId, @RequestHeader("Authorization") String jwt) throws UserException, OrderException{
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.findOrderById(orderId);
        return new ResponseEntity<Order>(order,HttpStatus.ACCEPTED);
    }   
    

}
