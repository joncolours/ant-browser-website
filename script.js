/* Scroll-triggered fade-up animations using Intersection Observer */

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    const cascadeElements = document.querySelectorAll('.cascade');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
    cascadeElements.forEach(el => observer.observe(el));

    /* FAQ scroll-triggered watch screen swap */
    const faqImg = document.querySelector('.faq-inner .watch-screen img');
    const faqItems = document.querySelectorAll('.faq-item[data-watch-image]');
    if (faqImg && faqItems.length) {
        let activeSrc = faqItems[0].dataset.watchImage;
        let swapping = false;

        function updateFaqWatch() {
            const viewCenter = window.innerHeight / 2;
            let closest = null;
            let closestDist = Infinity;

            faqItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;
                const dist = Math.abs(itemCenter - viewCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = item;
                }
            });

            if (closest) {
                const newSrc = closest.dataset.watchImage;
                if (newSrc !== activeSrc && !swapping) {
                    activeSrc = newSrc;
                    swapping = true;
                    faqImg.classList.add('fading');
                    setTimeout(() => {
                        faqImg.src = newSrc;
                        faqImg.alt = closest.querySelector('.faq-question').textContent;
                        faqImg.classList.remove('fading');
                        swapping = false;
                    }, 300);
                }
            }
        }

        window.addEventListener('scroll', updateFaqWatch, { passive: true });
    }
});
