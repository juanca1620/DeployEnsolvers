package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.dto.LoginDto;
import com.ensolvers.juansoto.demo.entities.User;
import com.ensolvers.juansoto.demo.exceptions.ApiErrorException;
import com.ensolvers.juansoto.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository repository;

    @Autowired
    public LoginService (UserRepository repository){
        this.repository = repository;
    }

    public Integer login (LoginDto dto){
        User user = repository.findByUserNameAndPassword(dto.getUserName(), dto.getPassword()).orElseThrow(()-> new ApiErrorException("Invalid Credentials"));

        return user.getId();
    }
}
