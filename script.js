document.addEventListener("DOMContentLoaded", () => {
    // Toggle mobile menu
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", () => {
        document.querySelector("nav ul").classList.toggle("show");
    });

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // Product Card Carousel
    const track = document.querySelector(".carousel-track");
    if (track) {
        const cards = Array.from(track.children);
        const nextButton = document.querySelector(".carousel-btn.next");
        const prevButton = document.querySelector(".carousel-btn.prev");
        const trackContainer = document.querySelector(".carousel-track-container");
        let cardWidth = cards[0].offsetWidth + 20; // card width + margin
        let currentSlide = 0;

        // Update card width on resize
        window.addEventListener("resize", () => {
            cardWidth = cards[0].offsetWidth + 20;
            track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
        });

        const updateVisibleCards = () => {
            return Math.floor(trackContainer.offsetWidth / cardWidth);
        };

        nextButton.addEventListener("click", () => {
            const visibleCards = updateVisibleCards();
            if (currentSlide < cards.length - visibleCards) {
                currentSlide++;
                track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
            }
        });

        prevButton.addEventListener("click", () => {
            if (currentSlide > 0) {
                currentSlide--;
                track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
            }
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.pageYOffset > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// Contact Form Submission
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("responseMessage");

    if (name && email && message) {
        responseMessage.textContent = `Thank you for contacting us, ${name}. We will get back to you shortly.`;
        document.getElementById("contactForm").reset();
    } else {
        responseMessage.textContent = "Please fill in all fields.";
    }
}
