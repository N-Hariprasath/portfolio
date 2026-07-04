-- Combine Schema and Seed Data for MySQL
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- -------------------------------------------------------------
-- SCHEMA CREATION
-- -------------------------------------------------------------


-- About Section table
CREATE TABLE IF NOT EXISTS about (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    email VARCHAR(100),
    phone VARCHAR(20),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    introduction TEXT,
    objective TEXT,
    profile_image_url VARCHAR(255),
    resume_url VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g., 'Frontend', 'Backend', 'Database', 'Tools'
    display_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Education table
CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    degree VARCHAR(150) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    duration VARCHAR(50) NOT NULL, -- e.g., '2023 - 2027'
    gpa VARCHAR(20), -- e.g., '8.02'
    details TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    tech_stack VARCHAR(255) NOT NULL, -- comma separated, e.g., 'Spring Boot, Java, MySQL'
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    image_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- SEED DATA INJECTION
-- -------------------------------------------------------------

-- Clear tables (avoid duplicates on run)
DELETE FROM about;
DELETE FROM skills;
DELETE FROM education;
DELETE FROM projects;

-- Seed About Section
INSERT INTO about (name, role, location, email, phone, github_url, linkedin_url, introduction, objective, profile_image_url, resume_url)
VALUES (
    'Hariprasath N',
    'Web Developer',
    'Tirupur, Tamil Nadu, India',
    'hariprasath96267@gmail.com',
    '+91 9629704983',
    'https://github.com/N-Hariprasath',
    'https://www.linkedin.com/in/n-hariprasath',
    'Aspiring Web Developer with knowledge in HTML, CSS, JavaScript, Java, Spring Boot, and MySQL. Passionate about building responsive web applications and learning new technologies.',
    'To become a Full Stack Java Developer in a growth-oriented company, contribute to real-world projects, and continuously improve technical skills.',
    '/me.jpeg',
    '/resumes.pdf'
);

-- Seed Skills
INSERT INTO skills (name, category, display_order) VALUES
('HTML', 'Frontend', 1),
('CSS', 'Frontend', 2),
('JavaScript', 'Frontend', 3),
('Java', 'Backend', 4),
('Spring Boot', 'Backend', 5),
('MySQL', 'Database', 6),
('VS Code', 'Tools', 7),
('Eclipse', 'Tools', 8),
('GitHub', 'Tools', 9),
('MySQL Workbench', 'Tools', 10);

-- Seed Education
INSERT INTO education (degree, institution, duration, gpa, details)
VALUES (
    'B.E Computer Science Engineering',
    'Shree Venkateshwara Hi-Tech Engineering College',
    '2023 - 2027',
    '8.02 (Up to 5th Semester)',
    'Studied core computer science concepts including Data Structures, Database Management Systems, Software Engineering, and Web Development. Maintained a consistent CGPA of 8.02 through the 5th semester.'
);

-- Seed Projects
INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_url, is_featured, display_order) VALUES
(
    'Student Management System',
    'A comprehensive web application designed to manage student records, course enrollments, attendance, and academic performance. Provides interfaces for both administrators and students.',
    'Spring Boot, Java, MySQL, Thymeleaf, Bootstrap',
    'https://github.com/N-Hariprasath',
    NULL,
    '/uploads/projects/student-mgmt.jpg',
    TRUE,
    1
),
(
    'Uber Management System',
    'A detailed ride-hailing simulation system featuring ride bookings, driver dispatch logic, route tracking, and payment estimation. Fully deployed for demonstration.',
    'Java, Spring Boot, React, MySQL, Google Maps API',
    'https://github.com/N-Hariprasath',
    'https://github.com/N-Hariprasath',
    '/uploads/projects/uber-mgmt.jpg',
    TRUE,
    2
),
(
    'Food Delivery E-Commerce Website',
    'A responsive, visually stunning food ordering website with a shopping cart, category filters, order tracking, and integration with a mockup payment gateway.',
    'HTML, CSS, JavaScript, Spring Boot, MySQL',
    'https://github.com/N-Hariprasath',
    NULL,
    '/uploads/projects/food-delivery.jpg',
    TRUE,
    3
),
(
    'Employee Management System',
    'A secure backend system to handle HR operations, employee registration, attendance tracking, payroll, and performance records.',
    'Java, Swing, JDBC, MySQL',
    'https://github.com/N-Hariprasath',
    NULL,
    '/uploads/projects/employee-mgmt.jpg',
    FALSE,
    4
),
(
    'Portfolio Website',
    'A premium personal portfolio website showcasing professional skills, projects, and contacts, complete with an administrative dashboard for updating details in real time.',
    'HTML, CSS, JavaScript, Spring Boot, MySQL',
    'https://github.com/N-Hariprasath',
    NULL,
    '/uploads/projects/portfolio.jpg',
    FALSE,
    5
);
