package com.hariprasath.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "about")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String role;

    @Column(length = 150)
    private String location;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(name = "github_url", length = 255)
    private String githubUrl;

    @Column(name = "linkedin_url", length = 255)
    private String linkedinUrl;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    @Column(columnDefinition = "TEXT")
    private String objective;

    @Column(name = "profile_image_url", length = 255)
    private String profileImageUrl;

    @Column(name = "resume_url", length = 255)
    private String resumeUrl;
}
