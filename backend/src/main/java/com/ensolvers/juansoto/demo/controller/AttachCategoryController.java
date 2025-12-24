package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.CategoryNoteDto;
import com.ensolvers.juansoto.demo.services.AttachCategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/category")
public class AttachCategoryController {

    @Autowired
    private AttachCategoryService service;

    @PostMapping("/attach")
    public ResponseEntity<Map<String, String>> attachCategory(
            @Valid @RequestBody CategoryNoteDto dto,
            @RequestHeader(required = true) Integer userId) {

        service.attachCategory(dto.getNoteId(), dto.getCategoryId(), userId);
        return ResponseEntity.ok(Map.of("message", "Category attached successfully"));
    }

    @PostMapping("/remove")
    public ResponseEntity<Map<String, String>> removeCategory(
            @Valid @RequestBody CategoryNoteDto dto,
            @RequestHeader(required = true) Integer userId) {

        service.removeCategory(dto.getNoteId(), dto.getCategoryId(), userId);
        return ResponseEntity.ok(Map.of("message", "Category removed successfully"));
    }
}
