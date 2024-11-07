package com.shopease.service;

import com.shopease.exception.ProductException;
import com.shopease.model.Cart;
import com.shopease.model.User;
import com.shopease.request.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Long userId, AddItemRequest request) throws ProductException;

    public Cart findUserCart(Long userId);

}
