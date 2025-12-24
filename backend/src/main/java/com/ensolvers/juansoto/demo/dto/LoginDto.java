package com.ensolvers.juansoto.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class LoginDto {

    @NotEmpty(message = "The user name can not be empty")
    @Length(message = "The username is too long",max = 255)
    private String userName;

    @NotEmpty(message = "The user name can not be empty")
    @Length(message = "The password is too long",max = 255)
    private String password;
}
