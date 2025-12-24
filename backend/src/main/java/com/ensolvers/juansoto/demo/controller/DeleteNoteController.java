package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.services.DeleteNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/notes")
public class DeleteNoteController {

    @Autowired
    private DeleteNoteService service;

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNote(
            @PathVariable Integer id,
            @RequestHeader(required = true) Integer userId) {

        service.deleteNote(id, userId);
        return ResponseEntity.ok(Map.of("message", "Note deleted successfully"));
    }
}
