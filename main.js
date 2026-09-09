/**
 * HARIPRASATH N - PURE FRONTEND DEVELOPER PORTFOLIO ENGINE
 * 100% Vanilla JavaScript (ES6+) - Fast, Lightweight, Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------- 1. Mobile Hamburger Menu -----------------
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ----------------- 2. Navbar Sticky & Scroll Spy -----------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Navbar blur elevation
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Active link tracking
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });

        // Scroll-to-Top Button
        if (scrollTopBtn) {
            if (scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----------------- 3. Dynamic Typewriter Effect -----------------
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = [
            "Frontend Developer",
            "Web Developer"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 60;
        const delayBetweenWords = 1800;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeDelay = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                typeDelay = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeDelay = 400;
            }

            setTimeout(type, typeDelay);
        }

        type();
    }

    // ----------------- 4. Skills Category Filter -----------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------- 5. Animated Counter for Stats -----------------
    let counted = false;
    const countUp = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentVal = isDecimal
                    ? (easeProgress * target).toFixed(2)
                    : Math.floor(easeProgress * target);

                counter.textContent = currentVal + (counter.getAttribute('data-suffix') || '');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.getAttribute('data-suffix') || '');
                }
            }

            requestAnimationFrame(updateCounter);
        });
    };

    // ----------------- 6. Scroll Reveal Observer -----------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'about' && !counted) {
                    countUp();
                    counted = true;
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------- 7. Contact Form Handler (Direct Inbox Email Delivery) -----------------
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                showFormAlert("Please fill in all required fields.", "error");
                return;
            }

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

            fetch('https://formsubmit.co/ajax/hariprasath96267@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: subject ? `[Portfolio Message] ${subject} - ${name}` : `New Portfolio Inquiry from ${name}`,
                    message: message,
                    _template: 'table'
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response error');
            })
            .then(data => {
                showFormAlert(`Thank you, ${name}! Your message has been sent directly to my email inbox. I will reply to you soon!`, "success");
                contactForm.reset();
            })
            .catch(error => {
                console.error("Form error:", error);
                showFormAlert(`Something went wrong. Please email me directly at <a href="mailto:hariprasath96267@gmail.com" style="text-decoration: underline; font-weight: bold; color: inherit;">hariprasath96267@gmail.com</a>.`, "error");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }

    function showFormAlert(text, type) {
        if (!formAlert) return;
        formAlert.innerHTML = text;
        formAlert.className = `form-alert ${type}`;
        formAlert.style.display = 'block';

        setTimeout(() => {
            formAlert.style.display = 'none';
        }, 8000);
    }
});
