package com.hariprasath.portfolio.controller;

import com.hariprasath.portfolio.entity.Project;
import com.hariprasath.portfolio.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepository.findAllByOrderByDisplayOrderAsc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project saved = projectRepository.save(project);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projDetails) {
        return projectRepository.findById(id)
                .map(existingProj -> {
                    existingProj.setTitle(projDetails.getTitle());
                    existingProj.setDescription(projDetails.getDescription());
                    existingProj.setTechStack(projDetails.getTechStack());
                    existingProj.setGithubUrl(projDetails.getGithubUrl());
                    existingProj.setLiveUrl(projDetails.getLiveUrl());
                    
                    if (projDetails.getImageUrl() != null) {
                        existingProj.setImageUrl(projDetails.getImageUrl());
                    }
                    
                    existingProj.setIsFeatured(projDetails.getIsFeatured());
                    existingProj.setDisplayOrder(projDetails.getDisplayOrder());
                    
                    Project updated = projectRepository.save(existingProj);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(proj -> {
                    projectRepository.delete(proj);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
