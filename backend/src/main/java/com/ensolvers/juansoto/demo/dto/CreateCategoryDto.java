package com.ensolvers.juansoto.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class CreateCategoryDto {
    @NotEmpty(message = "The name can not be empty")
    @Length(message = "The name is too long",max = 255)
    private String name;
}
