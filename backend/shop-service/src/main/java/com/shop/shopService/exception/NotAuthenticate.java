package com.shop.shopService.exception;

public class NotAuthenticate extends RuntimeException {
    public NotAuthenticate(String message) {
        super(message);
    }
}
