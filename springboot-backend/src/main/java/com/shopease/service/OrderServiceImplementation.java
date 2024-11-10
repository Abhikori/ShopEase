package com.shopease.service;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shopease.exception.OrderException;
import com.shopease.model.Address;
import com.shopease.model.Cart;
import com.shopease.model.CartItem;
import com.shopease.model.Order;
import com.shopease.model.OrderItem;
import com.shopease.model.User;
import com.shopease.repository.AddressRepository;
import com.shopease.repository.OrderItemRepository;
import com.shopease.repository.OrderRepository;
import com.shopease.repository.UserRepository;

@Service
public class OrderServiceImplementation implements OrderService {

    private OrderRepository orderRepository;
    private CartService cartService;
    private AddressRepository addressRepository;
    private UserRepository userRepository;
    private OrderItemService orderItemService;
    private OrderItemRepository orderItemRepository;

    public OrderServiceImplementation(OrderRepository orderRepository, CartService cartService, AddressRepository addressRepository, UserRepository userRepository, OrderItemService orderItemService, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.orderItemService = orderItemService;
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public Order createOrder(User user, Address shipAddress) {
        
        shipAddress.setUser(user);
        Address address=addressRepository.save(shipAddress);
        user.getAddresses().add(address);
        userRepository.save(user);

        Cart cart=cartService.findUserCart(user.getId());
        List<OrderItem> orderItems=new ArrayList<>();

        for(CartItem cartItem:cart.getCartItems()){
            OrderItem orderItem=new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setSize(cartItem.getSize());
            orderItem.setUserId(cartItem.getUserId());
            orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
            
            OrderItem createdOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(createdOrderItem);
        }

        Order createdOrder = new Order();
        createdOrder.setUser(user);
        createdOrder.setOrderitem(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountPrice(cart.getTotalDiscountedPrice());
        createdOrder.setDiscount(cart.getDiscount());
        createdOrder.setTotalItem(cart.getTotalItem());

        createdOrder.setShippingAddress(address);
        createdOrder.setOrderDate(LocalDateTime.now());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.getPaymentDetails().setPaymentStatus("PENDING");
        createdOrder.setCreateAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(createdOrder);

        for(OrderItem orderItem : orderItems){
            orderItem.setOrder(savedOrder);
            orderItemRepository.save(orderItem);
        }
        return savedOrder;
        
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()) {
            return order.get();
        }
        throw new OrderException("Order not found for id: " + orderId);

    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        
        List<Order> orders = orderRepository.getUsersOrders(userId);
        return orders;    
    }

    @Override
    public Order placedOrder(Long orderId) throws OrderException {
        
        Order order = findOrderById(orderId);
        order.setOrderStatus("PLACED");
        order.getPaymentDetails().setPaymentStatus("COMPLETED");
        return order;
        
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {
        
        Order order=findOrderById(orderId);
        order.setOrderStatus("CONFIRMED");
        return orderRepository.save(order);
        
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        
        Order order = findOrderById(orderId);
        order.setOrderStatus("SHIPPED");
        return orderRepository.save(order);
        
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {
        
        Order order = findOrderById(orderId);
        order.setOrderStatus("DELIVERED");
        return orderRepository.save(order);
        
    }

    @Override
    public Order cancledOrder(Long orderId) throws OrderException {
        
        Order order = findOrderById(orderId);
        order.setOrderStatus("CANCELLED");
        return orderRepository.save(order);
        
    }

    @Override
    public List<Order> getAllOrders() {
        
        return orderRepository.findAll();
        
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {
        
        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
        
    }

}
