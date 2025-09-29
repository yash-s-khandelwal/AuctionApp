package com.adslide.auction.auction.service;

import com.adslide.auction.auction.model.Bid;
import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
        orderRequest.put("payment_capture", 1);

        orderRequest.put("notes", notes);

        Order order = razorpayClient.orders.create(orderRequest);
        return order.toString();
    }

    public String createRefund(Bid completeBid) throws RazorpayException {
        RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        String paymentId = completeBid.getRazorpayPaymentId();

        JSONObject refundRequest = new JSONObject();
        refundRequest.put("amount", (int) completeBid.getPrice() * 100);
        refundRequest.put("speed", "normal");
        JSONObject notes = new JSONObject();
        notes.put("refund reason", "Cancelled Bid");
        refundRequest.put("notes", notes);
        refundRequest.put("receipt", completeBid.getBidId().toString());

        Refund refund = razorpay.payments.refund(paymentId, refundRequest);
        return refund.toString();
    }

}
