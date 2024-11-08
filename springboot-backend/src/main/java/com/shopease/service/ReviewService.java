package com.shopease.service;

import java.util.List;

import com.shopease.exception.ProductException;
import com.shopease.model.Review;
import com.shopease.model.User;
import com.shopease.request.ReviewRequest;

public interface ReviewService {

    public Review createReview(ReviewRequest req, User user) throws ProductException;

    public List<Review> getAllReview(Long productId); 

}
