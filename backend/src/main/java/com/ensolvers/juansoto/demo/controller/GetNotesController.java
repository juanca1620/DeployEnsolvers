package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.NoteResponseDto;
import com.ensolvers.juansoto.demo.services.GetNotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
public class GetNotesController {

    @Autowired
    private GetNotesService service;

    @GetMapping
    public ResponseEntity<List<NoteResponseDto>> getNotes(
            @RequestHeader(required = true) Integer userId,
            @RequestParam(required = false) Integer category,
            @RequestParam(required = false) Boolean active) {

        List<NoteResponseDto> notes = service.getNotes(userId, category, active);
        return ResponseEntity.ok(notes);
    }
}
