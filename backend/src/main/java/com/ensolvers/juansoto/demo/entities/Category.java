package com.ensolvers.juansoto.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories",schema = "notes")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255,name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    private User user;
}
