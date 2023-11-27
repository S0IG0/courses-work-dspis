package com.shop.shopService.exception;

public class NotFoundItemException extends RuntimeException {
    public NotFoundItemException(String message) {
        super(message);
    }
}
