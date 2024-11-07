package com.shopease.service;

import org.springframework.stereotype.Service;

import com.shopease.exception.ProductException;
import com.shopease.model.Cart;
import com.shopease.model.CartItem;
import com.shopease.model.Product;
import com.shopease.model.User;
import com.shopease.repository.CartRepository;
import com.shopease.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService{

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;

    public CartServiceImplementation(CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Cart createCart(User user) {
        
        Cart createdCart = new Cart();
        createdCart.setUser(user);
        Cart savedCart = cartRepository.save(createdCart);
        return savedCart;

    }

    @Override
    public String addCartItem(Long userId, AddItemRequest request) throws ProductException {
        
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(request.getProductId());
        CartItem isPresent = cartItemService.isCartItemExist(cart, product, request.getSize(), userId);

        if(isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setUserId(userId);
            int quantity = request.getQuantity() != null ? request.getQuantity() : 1;
            int price = quantity * product.getDiscountedPrice();
            cartItem.setPrice(price);
            cartItem.setSize(request.getSize());
            cartItem.setDiscountedPrice(product.getDiscountedPrice() * quantity);
            CartItem createdCartItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
        }
        cartRepository.save(cart);
        return "Item added to cart";
        
    }

    @Override
    public Cart findUserCart(Long userId) {
        
        Cart cart = cartRepository.findByUserId(userId);
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for(CartItem cartItem : cart.getCartItems()) {
            totalPrice = totalPrice + cartItem.getPrice();
            totalDiscountedPrice = totalDiscountedPrice + cartItem.getDiscountedPrice();
            totalItem = totalItem + cartItem.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setDiscount(totalPrice - totalDiscountedPrice);
        cartRepository.save(cart);
        return cart;
        
    }

}
