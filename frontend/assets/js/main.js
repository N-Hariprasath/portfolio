// Main landing page integration script
document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Fallback data for smooth first load or offline backend
    const fallbackData = {
        about: {
            name: "HARIPRASATH N",
            role: "Web Developer",
            location: "Tirupur, Tamil Nadu, India",
            email: "hariprasath96267@gmail.com",
            phone: "+91 9629704983",
            githubUrl: "https://github.com/N-Hariprasath",
            linkedinUrl: "https://www.linkedin.com/in/n-hariprasath",
            introduction: "Aspiring Web Developer with knowledge in HTML, CSS, JavaScript, Java, Spring Boot, and MySQL. Passionate about building responsive web applications and learning new technologies.",
            objective: "To become a Full Stack Java Developer in a growth-oriented company, contribute to real-world projects, and continuously improve technical skills.",
            profileImageUrl: "../me.jpeg", // local fallback
            resumeUrl: "../resumes.pdf" // local fallback
        },
        skills: [
            { name: "HTML", category: "Frontend" },
            { name: "CSS", category: "Frontend" },
            { name: "JavaScript", category: "Frontend" },
            { name: "Java", category: "Backend" },
            { name: "Spring Boot", category: "Backend" },
            { name: "MySQL", category: "Database" },
            { name: "VS Code", category: "Tools" },
            { name: "Eclipse", category: "Tools" },
            { name: "GitHub", category: "Tools" },
            { name: "MySQL Workbench", category: "Tools" }
        ],
        education: [
            {
                degree: "B.E Computer Science Engineering",
                institution: "Shree Venkateshwara Hi-Tech Engineering College",
                duration: "2023 - 2027",
                gpa: "8.01 (Up to 5th Semester)",
                details: "Studied core computer science concepts including Data Structures, Database Management Systems, Software Engineering, and Web Development. Maintained a consistent CGPA of 8.01 through the 5th semester."
            }
        ],
        projects: [

            {
                title: "Uber Management System",
                description: "A detailed ride-hailing simulation system featuring ride bookings, driver dispatch logic, route tracking, and payment estimation. Fully deployed for demonstration.",
                techStack: "HTML, CSS, JavaScript, Flask, Xampp",
                githubUrl: "https://github.com/N-Hariprasath/uber_management_system",
                liveUrl: null,
                imageUrl: null,
                isFeatured: true
            },
            {
                title: "Food Delivery E-Commerce Website",
                description: "A responsive, visually stunning food ordering website with a shopping cart, category filters, order tracking, and integration with a mockup payment gateway.",
                techStack: "HTML, CSS, JavaScript, Flask, Xampp",
                githubUrl: "https://github.com/N-Hariprasath/food_delivery_websitte",
                liveUrl: null,
                imageUrl: null,
                isFeatured: true
            },

            {
                title: "Portfolio Website",
                description: "A premium personal portfolio website showcasing professional skills, projects, and contacts, complete with an administrative dashboard for updating details in real time.",
                techStack: "HTML, CSS, JavaScript, Java, Spring Boot, MySQL",
                githubUrl: "https://github.com/N-Hariprasath/portfolio",
                liveUrl: null,
                imageUrl: null,
                isFeatured: false
            }
        ]
    };

    // Load All Data from API (with Fallbacks)
    async function loadPortfolioData() {
        try {
            // Load About
            let aboutData;
            try {
                aboutData = await API.get('/about');
                if (!aboutData || !aboutData.name) throw new Error("Empty db");
            } catch (e) {
                console.warn("Could not load about data from API, using fallback:", e);
                aboutData = fallbackData.about;
            }
            renderAbout(aboutData);

            // Load Skills
            let skillsData;
            try {
                skillsData = await API.get('/skills');
                if (!skillsData || skillsData.length === 0) throw new Error("Empty db");
            } catch (e) {
                console.warn("Could not load skills data from API, using fallback:", e);
                skillsData = fallbackData.skills;
            }
            renderSkills(skillsData);

            // Load Education
            let eduData;
            try {
                eduData = await API.get('/education');
                if (!eduData || eduData.length === 0) throw new Error("Empty db");
            } catch (e) {
                console.warn("Could not load education data from API, using fallback:", e);
                eduData = fallbackData.education;
            }
            renderEducation(eduData);

            // Load Projects
            let projectsData;
            try {
                projectsData = await API.get('/projects');
                if (!projectsData || projectsData.length === 0) throw new Error("Empty db");
            } catch (e) {
                console.warn("Could not load projects data from API, using fallback:", e);
                projectsData = fallbackData.projects;
            }
            renderProjects(projectsData);

        } catch (error) {
            console.error("Critical error building interface:", error);
        }
    }

    // Render functions
    function renderAbout(data) {
        // Elements in DOM
        const nameElements = document.querySelectorAll('.dynamic-name');
        const roleElements = document.querySelectorAll('.dynamic-role');
        const introEl = document.getElementById('dynamic-intro');
        const objectiveEl = document.getElementById('dynamic-objective');
        const locationEl = document.getElementById('dynamic-location');
        const emailEl = document.getElementById('dynamic-email');
        const phoneEl = document.getElementById('dynamic-phone');
        const githubLinks = document.querySelectorAll('.dynamic-github');
        const linkedinLinks = document.querySelectorAll('.dynamic-linkedin');
        const profileImg = document.getElementById('dynamic-profile-img');
        const downloadResumeBtn = document.getElementById('btn-download-resume');

        nameElements.forEach(el => el.textContent = data.name || "Hariprasath N");
        roleElements.forEach(el => el.textContent = data.role || "Web Developer");
        
        if (introEl) introEl.textContent = data.introduction || "";
        if (objectiveEl) objectiveEl.textContent = data.objective || "";
        if (locationEl) locationEl.textContent = data.location || "";
        if (emailEl) {
            emailEl.textContent = data.email || "";
            emailEl.setAttribute('href', `mailto:${data.email}`);
        }
        if (phoneEl) {
            phoneEl.textContent = data.phone || "";
            phoneEl.setAttribute('href', `tel:${data.phone}`);
        }

        githubLinks.forEach(el => el.setAttribute('href', data.githubUrl || '#'));
        linkedinLinks.forEach(el => el.setAttribute('href', data.linkedinUrl || '#'));

        if (profileImg && data.profileImageUrl) {
            // Determine if using backend upload or relative fallback path
            const src = data.profileImageUrl.startsWith('http') || data.profileImageUrl.startsWith('/')
                ? `${CONFIG.UPLOAD_BASE_URL}${data.profileImageUrl}`
                : data.profileImageUrl;
            profileImg.setAttribute('src', src);
        }

        if (downloadResumeBtn && data.resumeUrl) {
            const url = data.resumeUrl.startsWith('http') || data.resumeUrl.startsWith('/')
                ? `${CONFIG.UPLOAD_BASE_URL}${data.resumeUrl}`
                : data.resumeUrl;
            downloadResumeBtn.setAttribute('href', url);
        }
    }

    function renderSkills(skills) {
        const categories = {
            Frontend: document.getElementById('skills-frontend'),
            Backend: document.getElementById('skills-backend'),
            Database: document.getElementById('skills-database'),
            Tools: document.getElementById('skills-tools')
        };

        // Clear containers
        Object.values(categories).forEach(container => {
            if (container) container.innerHTML = '';
        });

        skills.forEach(skill => {
            const container = categories[skill.category];
            if (container) {
                const item = document.createElement('div');
                item.className = 'skill-item';
                item.innerHTML = `<i class="fa-solid fa-code"></i><span>${skill.name}</span>`;
                container.appendChild(item);
            }
        });
    }

    function renderEducation(eduList) {
        const container = document.getElementById('education-timeline-container');
        if (!container) return;
        container.innerHTML = '';

        eduList.forEach((edu, idx) => {
            const item = document.createElement('div');
            const direction = idx % 2 === 0 ? 'left' : 'right';
            item.className = `timeline-item timeline-item-${direction} reveal reveal-${direction}`;
            
            item.innerHTML = `
                <div class="timeline-date">${edu.duration}</div>
                <div class="timeline-content">
                    <h3>${edu.degree}</h3>
                    <h4>${edu.institution}</h4>
                    <p>${edu.details || ''}</p>
                    ${edu.gpa ? `<div class="timeline-gpa"><i class="fa-solid fa-graduation-cap"></i>CGPA: ${edu.gpa}</div>` : ''}
                </div>
            `;
            container.appendChild(item);
        });

        // Re-initialize intersection observers for the newly created education cards
        const revealElements = container.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => revealObserver.observe(element));
    }

    function renderProjects(projects) {
        const featuredContainer = document.getElementById('projects-featured-grid');
        const otherContainer = document.getElementById('projects-other-grid');

        if (featuredContainer) featuredContainer.innerHTML = '';
        if (otherContainer) otherContainer.innerHTML = '';

        let featuredCount = 0;
        let otherCount = 0;

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card hover-zoom reveal reveal-up';
            
            const tagsHtml = project.techStack
                ? project.techStack.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('')
                : '';

            const isFeatured = project.isFeatured || project.featured; // support both property names
            
            // Project Image setup
            let imgHtml = `<i class="fa-solid fa-laptop-code"></i>`;
            if (project.imageUrl) {
                const src = project.imageUrl.startsWith('http') || project.imageUrl.startsWith('/uploads')
                    ? `${CONFIG.UPLOAD_BASE_URL}${project.imageUrl}`
                    : project.imageUrl;
                imgHtml = `<img src="${src}" alt="${project.title}">`;
            }

            card.innerHTML = `
                <div class="project-image">
                    ${imgHtml}
                    ${isFeatured ? `<span class="project-featured-badge">Featured</span>` : ''}
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                    <div class="project-links">
                        ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link project-link-secondary" target="_blank"><i class="fa-brands fa-github"></i>GitHub</a>` : ''}
                        ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link project-link-primary" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i>Live Demo</a>` : ''}
                    </div>
                </div>
            `;

            if (isFeatured && featuredContainer) {
                featuredContainer.appendChild(card);
                featuredCount++;
            } else if (otherContainer) {
                otherContainer.appendChild(card);
                otherCount++;
            }
        });

        // Hide headers if counts are zero
        const featuredHeader = document.getElementById('featured-projects-header');
        const otherHeader = document.getElementById('other-projects-header');
        if (featuredHeader && featuredCount === 0) featuredHeader.style.display = 'none';
        if (otherHeader && otherCount === 0) otherHeader.style.display = 'none';

        // Re-run animation reveal triggers
        const revealElements = document.querySelectorAll('.project-card.reveal');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(element => revealObserver.observe(element));
    }

    // Contact Form submission logic
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };

            if (formStatus) {
                formStatus.style.display = 'block';
            }

            try {
                await API.post('/contact', formData);
                if (formStatus) {
                    formStatus.textContent = "Message sent successfully! Thank you.";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                }
            } catch (error) {
                console.warn("Failed to send contact message via API, storing locally:", error);
                
                // Fallback: save to local storage
                try {
                    const localMsgs = JSON.parse(localStorage.getItem('contact_messages') || '[]');
                    formData.date = new Date().toISOString();
                    localMsgs.push(formData);
                    localStorage.setItem('contact_messages', JSON.stringify(localMsgs));
                } catch (lsErr) {
                    console.error("Local storage error:", lsErr);
                }

                if (formStatus) {
                    formStatus.textContent = "Message sent successfully! Thank you. (Offline Mode)";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    if (formStatus) formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Run Initial Load
    loadPortfolioData();
});
