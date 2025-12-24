package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.NoteUpdateDto;
import com.ensolvers.juansoto.demo.services.UpdateNoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/notes")
public class UpdateNoteController {

    @Autowired
    private UpdateNoteService service;

    @PutMapping
    public ResponseEntity<Map<String, String>> updateNote(
            @Valid @RequestBody NoteUpdateDto dto,
            @RequestHeader(required = true) Integer userId) {

        service.updateNote(dto.getId(), dto.getTitle(), dto.getContent(), userId);
        return ResponseEntity.ok(Map.of("message", "Note updated successfully"));
    }
}
