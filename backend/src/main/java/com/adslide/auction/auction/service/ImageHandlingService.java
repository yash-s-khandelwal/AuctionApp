package com.adslide.auction.auction.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageHandlingService {
    @Value("${CLOUDINARY_CLOUD_NAME}")
    private String cloudName;

    @Value("${CLOUDINARY_API_KEY}")
    private String cloudinaryApiKey;

    private String CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
    private String API_KEY = cloudinaryApiKey;

    public String uploadImage(MultipartFile file) throws IOException {
        WebClient webClient = WebClient.create();

        byte[] fileBytes = file.getBytes();

        // The body of the request is a multipart form
        Map response = webClient.post()
                .uri(CLOUDINARY_UPLOAD_URL)
                .body(BodyInserters.fromMultipartData("file", fileBytes)
                        .with("api_key", API_KEY)
                        .with("upload_preset", "your_upload_preset"))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        return response.get("secure_url").toString();
    }
}
