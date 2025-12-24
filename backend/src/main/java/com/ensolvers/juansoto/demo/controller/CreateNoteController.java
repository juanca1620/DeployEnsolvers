package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.NoteCreationDto;
import com.ensolvers.juansoto.demo.services.CreateNoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/notes")
public class CreateNoteController {

    @Autowired
    private CreateNoteService service;

    @PostMapping
    public ResponseEntity<Map<String, String>> createNote(@Valid @RequestBody NoteCreationDto dto,
            @RequestHeader(required = true) Integer userId) {
        service.createNote(dto.getTitle(), dto.getContent(), userId);
        return ResponseEntity.status(200).body(Map.of("message", "Noted created successfully"));
    }
}
