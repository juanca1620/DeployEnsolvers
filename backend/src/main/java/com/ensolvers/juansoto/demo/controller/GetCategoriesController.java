package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.CategoryResponseDto;
import com.ensolvers.juansoto.demo.services.GetCategoryByUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
public class GetCategoriesController {
    @Autowired
    private GetCategoryByUser service;

    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getNotes(
            @RequestHeader(required = true) Integer userId) {

        List<CategoryResponseDto> notes = service.getCategoriesByUser(userId);
        return ResponseEntity.ok(notes);
    }
}
