package com.hariprasath.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "tech_stack", nullable = false, length = 255)
    private String techStack;

    @Column(name = "github_url", length = 255)
    private String githubUrl;

    @Column(name = "live_url", length = 255)
    private String liveUrl;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    @Column(name = "display_order")
    private Integer displayOrder;
}
