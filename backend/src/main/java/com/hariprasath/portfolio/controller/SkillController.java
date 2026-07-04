package com.hariprasath.portfolio.controller;

import com.hariprasath.portfolio.entity.Skill;
import com.hariprasath.portfolio.repository.SkillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillRepository skillRepository;

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillRepository.findAllByOrderByDisplayOrderAsc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        return skillRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        Skill saved = skillRepository.save(skill);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill skillDetails) {
        return skillRepository.findById(id)
                .map(existingSkill -> {
                    existingSkill.setName(skillDetails.getName());
                    existingSkill.setCategory(skillDetails.getCategory());
                    existingSkill.setDisplayOrder(skillDetails.getDisplayOrder());
                    Skill updated = skillRepository.save(existingSkill);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        return skillRepository.findById(id)
                .map(skill -> {
                    skillRepository.delete(skill);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
