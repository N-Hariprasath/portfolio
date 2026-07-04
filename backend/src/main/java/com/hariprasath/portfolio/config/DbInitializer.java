package com.hariprasath.portfolio.config;

import com.hariprasath.portfolio.entity.*;
import com.hariprasath.portfolio.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DbInitializer implements CommandLineRunner {

    private final AboutRepository aboutRepository;
    private final SkillRepository skillRepository;
    private final EducationRepository educationRepository;
    private final ProjectRepository projectRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed About details
        if (aboutRepository.count() == 0) {
            About about = About.builder()
                    .name("Hariprasath N")
                    .role("Web Developer")
                    .location("Tirupur, Tamil Nadu, India")
                    .email("hariprasath96267@gmail.com")
                    .phone("+91 9629704983")
                    .githubUrl("https://github.com/N-Hariprasath")
                    .linkedinUrl("https://www.linkedin.com/in/n-hariprasath")
                    .introduction("Aspiring Web Developer with knowledge in HTML, CSS, JavaScript, Java, Spring Boot, and MySQL. Passionate about building responsive web applications and learning new technologies.")
                    .objective("To become a Full Stack Java Developer in a growth-oriented company, contribute to real-world projects, and continuously improve technical skills.")
                    .profileImageUrl("/me.jpeg")
                    .resumeUrl("/resumes.pdf")
                    .build();
            aboutRepository.save(about);
            System.out.println("Default profile/about details seeded");
        }

        // 2. Seed Skills details
        if (skillRepository.count() == 0) {
            List<Skill> skills = List.of(
                    Skill.builder().name("HTML").category("Frontend").displayOrder(1).build(),
                    Skill.builder().name("CSS").category("Frontend").displayOrder(2).build(),
                    Skill.builder().name("JavaScript").category("Frontend").displayOrder(3).build(),
                    Skill.builder().name("Java").category("Backend").displayOrder(4).build(),
                    Skill.builder().name("Spring Boot").category("Backend").displayOrder(5).build(),
                    Skill.builder().name("MySQL").category("Database").displayOrder(6).build(),
                    Skill.builder().name("VS Code").category("Tools").displayOrder(7).build(),
                    Skill.builder().name("Eclipse").category("Tools").displayOrder(8).build(),
                    Skill.builder().name("GitHub").category("Tools").displayOrder(9).build(),
                    Skill.builder().name("MySQL Workbench").category("Tools").displayOrder(10).build()
            );
            skillRepository.saveAll(skills);
            System.out.println("Default skills details seeded");
        }

        // 3. Seed Education details
        if (educationRepository.count() == 0) {
            Education edu = Education.builder()
                    .degree("B.E Computer Science Engineering")
                    .institution("Shree Venkateshwara Hi-Tech Engineering College")
                    .duration("2023 - 2027")
                    .gpa("8.02 (Up to 5th Semester)")
                    .details("Studied core computer science concepts including Data Structures, Database Management Systems, Software Engineering, and Web Development. Maintained a consistent CGPA of 8.02 through the 5th semester.")
                    .build();
            educationRepository.save(edu);
            System.out.println("Default education details seeded");
        }

        // 4. Seed Projects details
        if (projectRepository.count() == 0) {
            List<Project> projects = List.of(
                    Project.builder()
                            .title("Student Management System")
                            .description("A comprehensive web application designed to manage student records, course enrollments, attendance, and academic performance. Provides interfaces for both administrators and students.")
                            .techStack("Spring Boot, Java, MySQL, Thymeleaf, Bootstrap")
                            .githubUrl("https://github.com/N-Hariprasath")
                            .isFeatured(true)
                            .displayOrder(1)
                            .build(),
                    Project.builder()
                            .title("Uber Management System")
                            .description("A detailed ride-hailing simulation system featuring ride bookings, driver dispatch logic, route tracking, and payment estimation. Deployed on demonstration servers.")
                            .techStack("Java, Spring Boot, React, MySQL, Google Maps API")
                            .githubUrl("https://github.com/N-Hariprasath")
                            .liveUrl("https://github.com/N-Hariprasath")
                            .isFeatured(true)
                            .displayOrder(2)
                            .build(),
                    Project.builder()
                            .title("Food Delivery E-Commerce Website")
                            .description("A responsive, visually stunning food ordering website with a shopping cart, category filters, order tracking, and integration with a mockup payment gateway.")
                            .techStack("HTML, CSS, JavaScript, Spring Boot, MySQL")
                            .githubUrl("https://github.com/N-Hariprasath")
                            .isFeatured(true)
                            .displayOrder(3)
                            .build(),
                    Project.builder()
                            .title("Employee Management System")
                            .description("A secure backend system to handle HR operations, employee registration, attendance tracking, payroll, and performance records.")
                            .techStack("Java, Swing, JDBC, MySQL")
                            .githubUrl("https://github.com/N-Hariprasath")
                            .isFeatured(false)
                            .displayOrder(4)
                            .build(),
                    Project.builder()
                            .title("Portfolio Website")
                            .description("A premium personal portfolio website showcasing professional skills, projects, and contacts, complete with an administrative dashboard for updating details in real time.")
                            .techStack("HTML, CSS, JavaScript, Spring Boot, MySQL")
                            .githubUrl("https://github.com/N-Hariprasath")
                            .isFeatured(false)
                            .displayOrder(5)
                            .build()
            );
            projectRepository.saveAll(projects);
            System.out.println("Default projects details seeded");
        }
    }
}
