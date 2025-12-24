package com.ensolvers.juansoto.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class ExecptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {

        FieldError error = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst().get();

        Map<String, String> map = Map.of("message", error.getDefaultMessage());
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApiErrorException.class)
    public ResponseEntity<Map<String, String>> handleApiErrors(ApiErrorException ex) {

        Map<String, String> map = Map.of("message", ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }
}
