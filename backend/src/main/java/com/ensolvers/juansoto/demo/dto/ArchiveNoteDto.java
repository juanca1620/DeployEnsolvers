package com.ensolvers.juansoto.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ArchiveNoteDto {

    @NotNull(message = "The note_id cannot be null")
    @JsonProperty("note_id")
    private Integer noteId;

    @NotNull(message = "The active status cannot be null")
    private Boolean active;
}
