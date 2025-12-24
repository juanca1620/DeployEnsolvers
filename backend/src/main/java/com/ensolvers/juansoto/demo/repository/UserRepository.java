package com.ensolvers.juansoto.demo.repository;

import com.ensolvers.juansoto.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUserName(String userName);
    Optional<User> findByUserNameAndPassword(String userName, String password);
}
