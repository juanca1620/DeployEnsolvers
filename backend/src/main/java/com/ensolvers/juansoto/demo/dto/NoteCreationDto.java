package com.ensolvers.juansoto.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class NoteCreationDto {

    @NotEmpty(message = "The title cannot be empty")
    @Length(message = "The title is too long", max = 255)
    private String title;

    @NotEmpty(message = "The content cannot be empty")
    @Length(message = "The content is too long", max = 255)
    private String content;
}
