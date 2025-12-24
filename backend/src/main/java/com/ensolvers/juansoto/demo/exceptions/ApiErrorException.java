package com.ensolvers.juansoto.demo.exceptions;

public class ApiErrorException extends RuntimeException{
    public ApiErrorException(String message) {
        super(message);
    }
}
