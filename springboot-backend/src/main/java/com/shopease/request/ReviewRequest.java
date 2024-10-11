package com.shopease.request;

public class ReviewRequest {

    private String review;
    private Long productId;

    public ReviewRequest() {
    
    }
    public ReviewRequest(String review, Long productId) {
        this.review = review;
        this.productId = productId;
    }

    
    public String getReview() {
        return review;
    }
    public void setReview(String review) {
        this.review = review;
    }
    public Long getProductId() {
        return productId;
    }
    public void setProductId(Long productId) {
        this.productId = productId;
    } 
    

    
    

}
