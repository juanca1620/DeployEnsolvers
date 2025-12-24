package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.LoginDto;
import com.ensolvers.juansoto.demo.services.LoginService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {

    @Autowired
    private LoginService service;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Integer>> login(@Valid @RequestBody LoginDto dto) {
        Integer id = service.login(dto);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("id", id));
    }
}
