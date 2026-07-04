USE portfolio_db;


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
    'Uber Management System',
    'A detailed ride-hailing simulation system featuring ride bookings, driver dispatch logic, route tracking, and payment estimation. Fully deployed for demonstration.',
    'Java, Spring Boot, React, MySQL, Google Maps API',
    'https://github.com/N-Hariprasath',
    'https://github.com/N-Hariprasath',
    '/uploads/projects/uber-mgmt.jpg',
    TRUE,
    1
),
(
    'Food Delivery E-Commerce Website',
    'A responsive, visually stunning food ordering website with a shopping cart, category filters, order tracking, and integration with a mockup payment gateway.',
    'HTML, CSS, JavaScript, Spring Boot, MySQL',
    'https://github.com/N-Hariprasath',
    NULL,
    '/uploads/projects/food-delivery.jpg',
    TRUE,
    2
),
(
    'Portfolio Website',
    'A premium personal portfolio website showcasing professional skills, projects, and contacts, complete with an administrative dashboard for updating details in real time.',
    'HTML, CSS, JavaScript, Spring Boot, MySQL',
    'https://github.com/N-Hariprasath',
    NULL,
    '/uploads/projects/portfolio.jpg',
    FALSE,
    3
);
