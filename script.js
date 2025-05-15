// =====================Toggle icon navbar===========================//
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// =====================Scroll sections active link===========================//
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // =====================Sticky navbar===========================//
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // =====================Remove toggle icon and navbar when clicking a navbar link (scroll)===========================//
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    
    // Check if skills section is in view while scrolling
    checkSkillsInView();
};


// =====================Scroll reveal===========================//
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


// =====================typed js===========================//
const typed = new Typed('.multiple-text', {
    strings: ['UI/UX Designer','Software Engineer', 'Full-Stack Developer','Tech Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// =====================Skills Progress Bars===========================//

// DOM Elements for skills
const skillBars = document.querySelectorAll('.skill-progress');

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 100);
    });
}

// Check if skills section is in view
function checkSkillsInView() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsSectionTop < windowHeight - 200) {
            animateSkillBars();
            // We don't remove the event listener here because it's part of the window.onscroll function
        }
    }
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Animate hero section elements with typed.js
    
    // Check if skills section is already in view
    setTimeout(() => {
        checkSkillsInView();
    }, 500);
    
    // If you have tab functionality, uncomment this:
     const activeTab = document.querySelector('.tab-btn.active');
     if (activeTab) {
         activeTab.click();
     }
});

// If you have tab functionality, uncomment and use this:

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`${tabId}-panel`).classList.add('active');
        
        // Trigger skill bar animation if technical tab is active
        if (tabId === 'technical') {
            animateSkillBars();
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Switch active button
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Show corresponding panel
            const target = button.getAttribute("data-tab");
            tabPanels.forEach(panel => {
                panel.classList.remove("active");
                if (panel.id === target + "-panel") panel.classList.add("active");
            });
        });
    });

    // Animate skill progress bars on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector(".skill-progress");
                const level = progress.getAttribute("data-level");
                progress.style.setProperty("--progress-width", level + "%");
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".animate-skill").forEach(item => observer.observe(item));
});