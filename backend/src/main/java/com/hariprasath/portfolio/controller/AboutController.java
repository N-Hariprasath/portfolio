package com.hariprasath.portfolio.controller;

import com.hariprasath.portfolio.entity.About;
import com.hariprasath.portfolio.repository.AboutRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/about")
@RequiredArgsConstructor
public class AboutController {

    private final AboutRepository aboutRepository;

    @GetMapping
    public ResponseEntity<About> getAboutDetails() {
        List<About> details = aboutRepository.findAll();
        if (details.isEmpty()) {
            // Seed a default record if database is empty so frontend doesn't break
            About defaultAbout = About.builder()
                    .name("Hariprasath N")
                    .role("Web Developer")
                    .location("Tirupur, Tamil Nadu, India")
                    .email("hariprasath96267@gmail.com")
                    .phone("+91 9629704983")
                    .githubUrl("https://github.com/N-Hariprasath")
                    .linkedinUrl("https://www.linkedin.com/in/n-hariprasath")
                    .introduction("Aspiring Web Developer with knowledge in HTML, CSS, JavaScript, Java, Spring Boot, and MySQL.")
                    .objective("To become a Full Stack Java Developer in a growth-oriented company, contribute to real-world projects, and continuously improve technical skills.")
                    .profileImageUrl("/uploads/profile.jpg")
                    .resumeUrl("/uploads/resume.pdf")
                    .build();
            aboutRepository.save(defaultAbout);
            return ResponseEntity.ok(defaultAbout);
        }
        return ResponseEntity.ok(details.get(0));
    }

    @PutMapping
    public ResponseEntity<About> updateAboutDetails(@RequestBody About about) {
        // Retrieve the first record to update, or create if none exists
        List<About> details = aboutRepository.findAll();
        if (details.isEmpty()) {
            About saved = aboutRepository.save(about);
            return ResponseEntity.ok(saved);
        }
        About existing = details.get(0);
        existing.setName(about.getName());
        existing.setRole(about.getRole());
        existing.setLocation(about.getLocation());
        existing.setEmail(about.getEmail());
        existing.setPhone(about.getPhone());
        existing.setGithubUrl(about.getGithubUrl());
        existing.setLinkedinUrl(about.getLinkedinUrl());
        existing.setIntroduction(about.getIntroduction());
        existing.setObjective(about.getObjective());
        
        // Preserve image and resume URLs if they aren't explicitly modified
        if (about.getProfileImageUrl() != null) {
            existing.setProfileImageUrl(about.getProfileImageUrl());
        }
        if (about.getResumeUrl() != null) {
            existing.setResumeUrl(about.getResumeUrl());
        }
        
        About updated = aboutRepository.save(existing);
        return ResponseEntity.ok(updated);
    }
}
