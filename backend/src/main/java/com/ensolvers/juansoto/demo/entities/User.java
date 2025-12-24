package com.ensolvers.juansoto.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "users",schema = "notes")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true,length = 255,name = "user_name")
    private String userName;

    @Column(length = 255,name = "password")
    private String password;

    @OneToMany(cascade = CascadeType.REMOVE,mappedBy = "user")
    private List<Note> notes;

    @OneToMany(cascade = CascadeType.REMOVE,mappedBy = "user")
    private List<Category> categories;
}
