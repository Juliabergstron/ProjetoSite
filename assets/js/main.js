// Importando todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Animação dos Cards
    initCardAnimations();
    // Slider/Carrossel
    initSlider();
});
    
// Animação dos Cards
function initCardAnimations() {
    const cards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target);
        }
    });
    }, {
    threshold: 0.1
});

    cards.forEach(card => {
        card.classList.add('card-animate');
    observer.observe(card);
});
}

// Slider/Carrossel
function initSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const sliderTrack = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    const nextBtn = slider.querySelector('.slider-next');
    const prevBtn = slider.querySelector('.slider-prev');
    const dots = slider.querySelector('.slider-dots');

    let currentSlide = 0;
    let slideWidth = slider.clientWidth;
    let autoplayInterval;

    // Criar dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    // Funções do slider
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        updateDots();
    }

    function updateDots() {
        const allDots = dots.querySelectorAll('.slider-dot');
        allDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Responsividade
    window.addEventListener('resize', () => {
        slideWidth = slider.clientWidth;
        updateSlider();
    });

    startAutoplay();
}
