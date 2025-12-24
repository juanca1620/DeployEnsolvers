package com.ensolvers.juansoto.demo.controller;

import com.ensolvers.juansoto.demo.dto.ArchiveNoteDto;
import com.ensolvers.juansoto.demo.services.ArchiveNoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/notes")
public class ArchiveNoteController {

    @Autowired
    private ArchiveNoteService service;

    @PostMapping("/changueStatus")
    public ResponseEntity<Map<String, String>> archiveNote(
            @Valid @RequestBody ArchiveNoteDto dto,
            @RequestHeader(required = true) Integer userId) {

        service.archiveNote(dto.getNoteId(), dto.getActive(), userId);
        return ResponseEntity.ok(Map.of("message", "Note status changed successfully"));
    }
}
