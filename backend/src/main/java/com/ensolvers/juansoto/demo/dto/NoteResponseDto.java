package com.ensolvers.juansoto.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponseDto {
    private Integer id;
    private String title;
    private String content;
    private Boolean isArchived;
    private List<CategoryResponseDto> categories;
}
