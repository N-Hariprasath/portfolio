package com.hariprasath.portfolio.controller;

import com.hariprasath.portfolio.entity.Education;
import com.hariprasath.portfolio.repository.EducationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationRepository educationRepository;

    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {
        return ResponseEntity.ok(educationRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        Education saved = educationRepository.save(education);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education eduDetails) {
        return educationRepository.findById(id)
                .map(existingEdu -> {
                    existingEdu.setDegree(eduDetails.getDegree());
                    existingEdu.setInstitution(eduDetails.getInstitution());
                    existingEdu.setDuration(eduDetails.getDuration());
                    existingEdu.setGpa(eduDetails.getGpa());
                    existingEdu.setDetails(eduDetails.getDetails());
                    Education updated = educationRepository.save(existingEdu);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(edu -> {
                    educationRepository.delete(edu);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
