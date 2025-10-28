const words = ['Studios.', 'Media.']; // Words to alternate
let currentWordIndex = 0;
let currentLetterIndex = 0;

function updateText() {
    const textElement = document.getElementById('text-change');
    const cursorElement = document.querySelector('.cursor-blink');
    textElement.style.fontSize = getComputedStyle(document.querySelector('.welcome-message h1')).fontSize; // Match font size
    textElement.textContent = words[currentWordIndex].substring(0, currentLetterIndex + 1);

    if (currentLetterIndex < words[currentWordIndex].length) {
        currentLetterIndex++;
        cursorElement.style.display = 'inline-block';
        setTimeout(updateText, 150); // Adjust typing speed here
    } else {
        cursorElement.style.display = 'none';
        setTimeout(() => {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            currentLetterIndex = 0;
            cursorElement.style.display = 'inline-block';
            setTimeout(updateText, 2000); // Pause before starting the next word
        }, 1000); // Pause after completing the word
    }
}

// Cursor Blur Inverse Effect
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Custom Style Mouse Pointer
const customPointer = document.createElement('div');
customPointer.classList.add('custom-pointer');
document.body.appendChild(customPointer);

document.addEventListener('mousemove', (e) => {
    customPointer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        customPointer.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        customPointer.classList.remove('hover');
    });
});

// Close the sidebar when scrolling
window.addEventListener('scroll', () => {
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle && navToggle.checked) {
        navToggle.checked = false; // Uncheck the toggle to close the sidebar
    }
});

// Close the sidebar when scrolling if it is closed
window.addEventListener('scroll', () => {
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle && !navToggle.checked) {
        navToggle.checked = true; // Check the toggle to open the sidebar
    }
});

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.innerWidth <= 768) { // Apply only on mobile
        if (window.scrollY > lastScrollY) {
            header.classList.add('hidden'); // Hide header on scroll down
        } else {
            header.classList.remove('hidden'); // Show header on scroll up
        }
        lastScrollY = window.scrollY;
    }
});

// Start the typing effect
document.addEventListener('DOMContentLoaded', updateText);
// Improved sidebar toggle with animation handling
function toggleSidebar() {
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle) {
        navToggle.checked = false;
    }
}

// Enhanced smooth scroll with error handling and offset
function scrollToSection() {
    const section = document.getElementById('services-section');
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const upBtn = document.querySelector('.carousel-arrow.up');
    const downBtn = document.querySelector('.carousel-arrow.down');
    let currentIndex = 0;
    let isTransitioning = false;
    let autoScrollInterval;

    // Hide all slides except the current one
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'flex' : 'none';
        });
    };

    const moveCarousel = (direction) => {
        if (isTransitioning) return;
        isTransitioning = true;
        let nextIndex = (currentIndex + direction + slides.length) % slides.length;

        // Optional: add fade-out/fade-in effect
        slides[currentIndex].classList.add('fade-out');
        setTimeout(() => {
            slides[currentIndex].classList.remove('fade-out');
            currentIndex = nextIndex;
            showSlide(currentIndex);
            slides[currentIndex].classList.add('fade-in');
            setTimeout(() => {
                slides[currentIndex].classList.remove('fade-in');
                isTransitioning = false;
            }, 400);
        }, 400);
    };

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => moveCarousel(1), 4000);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    upBtn?.addEventListener('click', () => moveCarousel(-1));
    downBtn?.addEventListener('click', () => moveCarousel(1));

    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Initial state
    showSlide(currentIndex);
    startAutoScroll();

    // Optional: clean up on page unload
    window.addEventListener('beforeunload', stopAutoScroll);
});
