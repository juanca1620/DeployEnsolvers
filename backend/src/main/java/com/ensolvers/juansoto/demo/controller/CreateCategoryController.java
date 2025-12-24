package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.CreateCategoryDto;
import com.ensolvers.juansoto.demo.services.CreateCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/category")
public class CreateCategoryController {
    @Autowired
    private CreateCategoryService service;

    @PostMapping
    public ResponseEntity<Map<String, String>> createCategory(@RequestHeader(required = true) Integer userId,
            @RequestBody CreateCategoryDto dto) {
        service.createCategory(dto.getName(), userId);
        return ResponseEntity.status(200).body(Map.of("message", "Category created successfully"));
    }
}
