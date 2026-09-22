/* =========================================================
   RUSHIKESH GAME - PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (cursorDot && cursorOutline) {

        window.addEventListener("mousemove", (e) => {

            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate(
                {
                    left: `${posX}px`,
                    top: `${posY}px`
                },
                {
                    duration: 400,
                    fill: "forwards"
                }
            );
        });

    }


    /* =====================================================
       TYPING ANIMATION
       ===================================================== */

    const typingText = document.querySelector(".typing-text");

    const roles = [
        "Aspiring Electronics & Embedded Systems Engineer",
        "Aspiring Embedded Systems Developer",
        "Aspiring Software Developer",
        "Aspiring VLSI Design Engineer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeRole() {

        if (!typingText) {
            return;
        }

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeRole, 1800);
                return;
            }

        } else {

            typingText.textContent =
                currentRole.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }

            }
        }

        setTimeout(
            typeRole,
            deleting ? 45 : 80
        );
    }

    typeRole();


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav ul li a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       SMOOTH NAVIGATION
       ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (e) => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId &&
                targetId.startsWith("#")
            ) {

                const target =
                    document.querySelector(targetId);

                if (target) {

                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }

        });

    });


    /* =====================================================
       SKILL CARD TOUCH / CLICK FLIP
       ===================================================== */

    const skillCards =
        document.querySelectorAll(".skill-card");

    skillCards.forEach((card) => {

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });

    });


    /* =====================================================
       CERTIFICATE CARD TOUCH / CLICK FLIP
       ===================================================== */

    const certificateCards =
        document.querySelectorAll(".certificate-card");

    certificateCards.forEach((card) => {

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });

    });


    /* =====================================================
       CERTIFICATE CAROUSEL
       ===================================================== */

    const certificateTrack =
        document.querySelector(".certificate-track");

    const certificateItems =
        document.querySelectorAll(".certificate-card");

    const nextButton =
        document.querySelector(".carousel-btn.next");

    const previousButton =
        document.querySelector(".carousel-btn.prev");

    const dotsContainer =
        document.querySelector(".carousel-dots");

    let certificateIndex = 0;


    function getVisibleCertificates() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 992) {
            return 2;
        }

        return 3;
    }


    function updateCertificateCarousel() {

        if (!certificateTrack || certificateItems.length === 0) {
            return;
        }

        const visible =
            getVisibleCertificates();

        const maxIndex =
            Math.max(
                0,
                certificateItems.length - visible
            );

        if (certificateIndex > maxIndex) {
            certificateIndex = maxIndex;
        }

        const cardWidth =
            certificateItems[0].getBoundingClientRect().width;

        const gap = 25;

        certificateTrack.style.transform =
            `translateX(-${certificateIndex * (cardWidth + gap)}px)`;

        updateCarouselDots();
    }


    function createCarouselDots() {

        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = "";

        const visible =
            getVisibleCertificates();

        const totalDots =
            Math.max(
                1,
                certificateItems.length - visible + 1
            );

        for (let i = 0; i < totalDots; i++) {

            const dot =
                document.createElement("span");

            dot.classList.add("carousel-dot");

            if (i === certificateIndex) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {

                certificateIndex = i;

                updateCertificateCarousel();

            });

            dotsContainer.appendChild(dot);
        }
    }


    function updateCarouselDots() {

        if (!dotsContainer) {
            return;
        }

        const dots =
            dotsContainer.querySelectorAll(".carousel-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === certificateIndex
            );

        });
    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {

            const visible =
                getVisibleCertificates();

            const maxIndex =
                Math.max(
                    0,
                    certificateItems.length - visible
                );

            if (certificateIndex < maxIndex) {
                certificateIndex++;
            } else {
                certificateIndex = 0;
            }

            updateCertificateCarousel();

        });

    }


    if (previousButton) {

        previousButton.addEventListener("click", () => {

            const visible =
                getVisibleCertificates();

            const maxIndex =
                Math.max(
                    0,
                    certificateItems.length - visible
                );

            if (certificateIndex > 0) {
                certificateIndex--;
            } else {
                certificateIndex = maxIndex;
            }

            updateCertificateCarousel();

        });

    }


    createCarouselDots();
    updateCertificateCarousel();


    window.addEventListener("resize", () => {

        createCarouselDots();
        updateCertificateCarousel();

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const hiddenElements =
        document.querySelectorAll(".hidden");

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    hiddenElements.forEach((element) => {

        observer.observe(element);

    });


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const subject =
                document.getElementById("subject")?.value.trim();

            const message =
                document.getElementById("message")?.value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                alert("Please fill in all fields.");

                return;
            }


            const mailSubject =
                encodeURIComponent(subject);

            const mailBody =
                encodeURIComponent(
                    `Name: ${name}\n\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`
                );


            window.location.href =
                `mailto:rushikeshgame951@gmail.com` +
                `?subject=${mailSubject}` +
                `&body=${mailBody}`;

        });

    }


    /* =====================================================
       VANILLA TILT
       ===================================================== */

    if (typeof VanillaTilt !== "undefined") {

        VanillaTilt.init(
            document.querySelectorAll(
                ".project-card, .principle-card"
            ),
            {
                max: 8,
                speed: 400,
                glare: true,
                "max-glare": 0.15
            }
        );

    }

});
