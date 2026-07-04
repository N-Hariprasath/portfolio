package com.hariprasath.portfolio.repository;

import com.hariprasath.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByDisplayOrderAsc();
}
