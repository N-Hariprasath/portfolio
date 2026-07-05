package com.hariprasath.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "education")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String degree;

    @Column(nullable = false, length = 200)
    private String institution;

    @Column(nullable = false, length = 50)
    private String duration; // e.g. 2023 - 2027

    @Column(length = 50)
    private String gpa; // e.g. 8.02

    @Column(columnDefinition = "TEXT")
    private String details;
}
