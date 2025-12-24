package com.ensolvers.juansoto.demo.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "notes_categories",schema = "notes")
@Data
public class NoteCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    private Note note;

    @ManyToOne(fetch =FetchType.LAZY,cascade = CascadeType.REMOVE)
    private Category category;
}
