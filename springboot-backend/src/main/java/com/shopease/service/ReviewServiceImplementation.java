package com.shopease.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import com.shopease.exception.ProductException;
import com.shopease.model.Product;
import com.shopease.model.Review;
import com.shopease.model.User;
import com.shopease.repository.ReviewRepository;
import com.shopease.request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements  ReviewService {

    private ReviewRepository reviewRepository;
    private ProductService productService;
   
    
    public ReviewServiceImplementation(ReviewRepository reviewRepository, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        
    }

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        
        Product product = productService.findProductById(req.getProductId());

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());

        return  reviewRepository.save(review);
        
    }

    @Override
    public List<Review> getAllReview(Long productId) {
        
        return reviewRepository.getAllProductsReview(productId);
        
    }

}
