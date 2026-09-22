document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CUSTOM CURSOR
  ========================= */

  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");

  if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    window.addEventListener("mousemove", (e) => {

      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      cursorOutline.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        },
        {
          duration: 350,
          fill: "forwards"
        }
      );

    });
  }


  /* =========================
     TYPING ANIMATION
  ========================= */

  const typingText = document.querySelector(".typing-text");

  const roles = [
    "Embedded Systems",
    "IoT & Automation",
    "Software Development",
    "UI/UX Design"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    typingText.textContent =
      currentRole.substring(0, charIndex);

    if (!deleting) {

      charIndex++;

      if (charIndex > currentRole.length) {

        deleting = true;

        setTimeout(typeEffect, 1200);

        return;
      }

    } else {

      charIndex--;

      if (charIndex < 0) {

        deleting = false;

        roleIndex =
          (roleIndex + 1) % roles.length;

        charIndex = 0;
      }
    }

    setTimeout(
      typeEffect,
      deleting ? 55 : 90
    );
  }

  typeEffect();


  /* =========================
     SMOOTH NAVIGATION
  ========================= */

  const navLinks =
    document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (target) {

        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });


  /* =========================
     ACTIVE NAVIGATION LINK
  ========================= */

  const sections =
    [...document.querySelectorAll("section[id]")];

  const navigationLinks =
    [...document.querySelectorAll('nav a[href^="#"]')];

  function updateActiveLink() {

    const scrollPosition =
      window.scrollY + 180;

    let currentSection =
      sections[0]?.id;

    sections.forEach((section) => {

      if (scrollPosition >= section.offsetTop) {

        currentSection = section.id;
      }

    });

    navigationLinks.forEach((link) => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
        `#${currentSection}`
      );

    });
  }

  window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
  );

  updateActiveLink();


  /* =========================
     CERTIFICATE CAROUSEL
  ========================= */

  const certificateCards =
    [...document.querySelectorAll(".certificate-card")];

  const certificateContainer =
    document.querySelector(".certificate-container");

  const dotsContainer =
    document.querySelector(".scroll-dots");

  const previousButton =
    document.querySelector("#prev-btn");

  const nextButton =
    document.querySelector("#next-btn");

  let certificateIndex = 0;


  function createDots() {

    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    certificateCards.forEach((_, index) => {

      const dot =
        document.createElement("span");

      if (index === certificateIndex) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {

        certificateIndex = index;

        updateCertificates();
      });

      dotsContainer.appendChild(dot);

    });
  }


  function updateCertificates() {

    if (
      !certificateContainer ||
      certificateCards.length === 0
    ) {
      return;
    }

    const isMobile =
      window.innerWidth <= 768;

    if (isMobile) {

      certificateCards.forEach((card, index) => {

        card.style.display =
          index === certificateIndex
            ? "block"
            : "none";

      });

    } else {

      certificateCards.forEach((card) => {

        card.style.display = "block";

      });

    }

    createDots();
  }


  if (previousButton) {

    previousButton.addEventListener("click", () => {

      if (certificateCards.length === 0) return;

      certificateIndex =
        (certificateIndex - 1 +
          certificateCards.length) %
        certificateCards.length;

      updateCertificates();

    });

  }


  if (nextButton) {

    nextButton.addEventListener("click", () => {

      if (certificateCards.length === 0) return;

      certificateIndex =
        (certificateIndex + 1) %
        certificateCards.length;

      updateCertificates();

    });

  }


  window.addEventListener(
    "resize",
    updateCertificates
  );

  updateCertificates();


  /* =========================
     SCROLL REVEAL ANIMATION
  ========================= */

  const revealElements =
    document.querySelectorAll(
      `
      section > h2,
      section > .section-subtitle,
      .project-card,
      .principle-card,
      .skill-card,
      .timeline-content,
      .certificate-card
      `
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach((element) => {

      element.classList.add("hidden");

      observer.observe(element);

    });

  }

});
