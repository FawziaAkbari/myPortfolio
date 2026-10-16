const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Scroll reveals: sections animate in gently as they enter the viewport.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  document.body.classList.add("js-motion");
  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-lead, .about-details, .skill-card, .project-card, .timeline-item, .education-block, .contact-panel, .trust-inner"
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    if (element.matches(".skill-card, .project-card")) {
      element.dataset.delay = String((index % 3) + 1);
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

// A small typewriter effect reinforces the educator/developer identity.
const typingText = document.querySelector(".typing-text");
const phrases = [
  "complex ideas into clear steps",
  "lessons into hands-on practice",
  "web concepts into real projects"
];
if (typingText && !reduceMotion) {
  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;

  const typeNext = () => {
    const phrase = phrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    typingText.textContent = phrase.slice(0, characterIndex);

    let delay = deleting ? 32 : 48;
    if (characterIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    } else if (characterIndex >= phrases[phraseIndex].length) {
      deleting = true;
      delay = 1700;
    }
    window.setTimeout(typeNext, delay);
  };
  window.setTimeout(typeNext, 1800);
}

const copyButton = document.getElementById("copyEmail");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.email;
    if (!email || email.includes("YOUR_EMAIL")) {
      showToast("Add your real email address in index.html first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email address copied.");
    } catch {
      showToast(`Email: ${email}`);
    }
  });
}

function showToast(message) {
  const oldToast = document.querySelector(".copy-toast");
  if (oldToast) oldToast.remove();
  const toast = document.createElement("div");
  toast.className = "copy-toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2800);
}
