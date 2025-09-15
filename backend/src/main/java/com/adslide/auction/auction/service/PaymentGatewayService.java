package com.adslide.auction.auction.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentGatewayService {

    @Value("${RAZORPAY_KEY_ID}")
    private String razorpayKeyId;

    @Value("${RAZORPAY_KEY_SECRET}")
    private String razorpayKeySecret;

    public String createOrder(int amount, String currency, Long bidId, Long productId, Long userId)
            throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", bidId.toString());
        JSONObject notes = new JSONObject();
        notes.put("productId", productId);
        notes.put("userId", userId);

        orderRequest.put("notes", notes);

        Order order = razorpayClient.orders.create(orderRequest);
        return order.toString();
    }

}
