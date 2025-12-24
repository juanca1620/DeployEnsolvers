package com.ensolvers.juansoto.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "notes", schema = "notes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255, name = "title")
    private String title;

    @Column(length = 255, name = "content")
    private String content;

    @Column(name = "is_archived")
    private Boolean isArchived;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private User user;

    @ManyToMany
    @JoinTable(name = "notes_categories", schema = "notes", joinColumns = @JoinColumn(name = "note_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;
}
