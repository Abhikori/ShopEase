package com.shopease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopease.exception.CartItemException;
import com.shopease.exception.ProductException;
import com.shopease.exception.UserException;
import com.shopease.model.Cart;
import com.shopease.model.CartItem;
import com.shopease.model.User;
import com.shopease.request.AddItemRequest;
import com.shopease.response.ApiResponse;
import com.shopease.service.CartItemService;
import com.shopease.service.CartService;
import com.shopease.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return new ResponseEntity<Cart>(cart,HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), req);
        ApiResponse res = new ApiResponse("Item added to cart", true);
        return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
    }

    @PutMapping("/cart_items/{cartItemId}")
    public ResponseEntity<ApiResponse> updateCartItem(@PathVariable Long cartItemId, @RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {
        User user = userService.findUserProfileByJwt(jwt);
        
        // Find the existing cart and item
        Cart cart = cartService.findUserCart(user.getId());
        CartItem cartItem = cartItemService.findCartItemById(cartItemId);
        
        // Update cart item details using the request body
        CartItem updatedCartItem = new CartItem();
        updatedCartItem.setProduct(cartItem.getProduct()); // Ensure you retain the product
        updatedCartItem.setQuantity(req.getQuantity()); // Assuming quantity update
        updatedCartItem.setSize(req.getSize()); // Assuming size update

        // Call service to update cart item
        cartItemService.updateCartItem(user.getId(), cartItemId, updatedCartItem);
        
        ApiResponse res = new ApiResponse("Cart item updated", true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
    @DeleteMapping("/cart_items/{cartItemId}")
    public ResponseEntity<ApiResponse> removeCartItem(@PathVariable Long cartItemId, @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {
        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);
        ApiResponse res = new ApiResponse("Item removed from cart", true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
}
