package com.ensolvers.juansoto.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CategoryNoteDto {

    @NotNull(message = "The category_id cannot be null")
    @JsonProperty("category_id")
    private Integer categoryId;

    @NotNull(message = "The note_id cannot be null")
    @JsonProperty("note_id")
    private Integer noteId;
}
