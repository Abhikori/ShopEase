package com.shopease.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.shopease.exception.OrderException;
import com.shopease.exception.UserException;
import com.shopease.model.Order;
import com.shopease.repository.OrderRepository;
import com.shopease.response.ApiResponse;
import com.shopease.response.PaymentLinkResponse;
import com.shopease.service.OrderService;
import com.shopease.service.UserService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService  userService;
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse>createPaymentLink(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws RazorpayException, UserException, OrderException {

        Order order=orderService.findOrderById(orderId);

        try {
            RazorpayClient razorpay=new RazorpayClient("rzp_test_UuJlWFauYhrh9O", "wPWiptq1K0OZ5s5k1m8zppXA");

            JSONObject paymentLinkRequest=new JSONObject();
            paymentLinkRequest.put("amount", order.getTotalPrice()*100);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFirstName());
            customer.put("contact", order.getUser().getMobile());
            customer.put("email", order.getUser().getEmail());

            paymentLinkRequest.put("customer", customer);

            JSONObject notify=new JSONObject();
            notify.put("sms",true);
            notify.put("email",true);
            paymentLinkRequest.put("notify",notify);

            paymentLinkRequest.put("callback_url", "http://localhost:4200/payment_success?order_id="+order.getId());
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink payment=razorpay.paymentLink.create(paymentLinkRequest);
            String paymentLinkId=payment.get("id");
            String paymentLinkUrl=payment.get("short_url");

            PaymentLinkResponse response=new PaymentLinkResponse(paymentLinkUrl, paymentLinkId);
            return new ResponseEntity<PaymentLinkResponse>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            throw new RazorpayException("Error creating payment link: "+e.getMessage());
        }

    }

    public ResponseEntity<ApiResponse> updatePayment(@RequestParam(name="payment_id") String paymentId,@RequestParam(name="order_id") Long orderId) throws RazorpayException, UserException, OrderException {
        Order order = orderService.findOrderById(orderId);

        RazorpayClient razorpay=new RazorpayClient("rzp_test_UuJlWFauYhrh9O", "wPWiptq1K0OZ5s5k1m8zppXA");
        try {

            Payment payment = razorpay.payments.fetch(paymentId); 
            if(payment.get("status").equals("captured")) {
                order.setOrderStatus("PLACED");
                order.getPaymentDetails().setPaymentId(paymentId);  
                order.getPaymentDetails().setPaymentStatus("PAID");
                orderRepository.save(order);
            }   
            ApiResponse response = new ApiResponse("Payment updated successfully", true);
            return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new RazorpayException("Error updating payment status: "+e.getMessage());
        }
    }

        

}
