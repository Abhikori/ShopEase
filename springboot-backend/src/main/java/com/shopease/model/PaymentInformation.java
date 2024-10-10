package com.shopease.model;

import jakarta.persistence.Column;

public class PaymentInformation {

    @Column(name = "cardholdername")
    private String cardholderName;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "expiration_date")
    private String expirationDate;

    @Column(name = "cvv")
    private String cvv;

}
