// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Combined DOMContentLoaded logic
document.addEventListener("DOMContentLoaded", () => {
    // Navbar entrance animation
    const navbar = document.getElementById("navbar");
    if (navbar) {
        navbar.style.opacity = "1";
        navbar.style.animation = "slideDownFade 0.8s ease forwards";
    }

    // IntersectionObserver-based scroll spy
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length && navLinks.length) {
        // map id -> link element for quick access
        const idToLink = {};
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#')) {
                idToLink[href.slice(1)] = link;
            }
        });

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // tuned so top section becomes active near top of viewport
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const link = idToLink[id];
                if (!link) return;

                if (entry.isIntersecting) {
                    // remove active from all
                    navLinks.forEach(l => l.classList.remove('active'));
                    // set active on the visible section's link
                    link.classList.add('active');
                } else {
                    // if we scrolled away, remove active (it will be added again when another section intersects)
                    link.classList.remove('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        // ensure initial state set immediately (in case observer hasn't fired yet)
        // find the first section that matches current scroll position and activate it
        function setInitialActive() {
            let found = false;
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (!found && rect.top <= window.innerHeight * 0.25 && rect.bottom >= window.innerHeight * 0.25) {
                    const id = section.getAttribute('id');
                    const link = idToLink[id];
                    if (link) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                        found = true;
                    }
                }
            });
            // fallback: if nothing matched (e.g., completely at top), set first section (home) active
            if (!found && sections[0]) {
                const id = sections[0].getAttribute('id');
                const link = idToLink[id];
                if (link) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        }

        // call once on load
        setInitialActive();

        // also call on resize (layout change)
        window.addEventListener('resize', setInitialActive);
    }
});

// Progress bar
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero description
const typingElement = document.querySelector('.typing-cursor');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        console.log('Form submitted:', formData);
        alert('Thank you for your message! I\'ll get back to you soon.');
        e.target.reset();
    });
}

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to gradient orbs
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Tech badge hover animation
document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    badge.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Skill items staggered animation on scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skills = entry.target.querySelectorAll('.skill-item');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                }, index * 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    skillsGrid.querySelectorAll('.skill-item').forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = 'all 0.5s ease';
    });
    skillsObserver.observe(skillsGrid);
}

// Console easter egg
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #06b6d4;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #10b981;');
