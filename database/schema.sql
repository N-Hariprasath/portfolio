-- Create portfolio database if not exists
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;


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
