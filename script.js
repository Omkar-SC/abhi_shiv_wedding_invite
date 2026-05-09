gsap.registerPlugin(ScrollTrigger);

// ===== 1. SEAL OPENING =====
function openInvite() {
    const overlay = document.getElementById("seal-overlay");
    const lottie  = document.getElementById("dateLottie");

    lottie.play();

    // Brief seal pulse → then ceremonial split
    gsap.to(".wax-seal", {
        scale: 1.07,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
            overlay.classList.add("open");

            // Fade overlay out after panels have opened
            gsap.to("#seal-overlay", {
                opacity: 0,
                duration: 1.4,
                delay: 1.3,
                ease: "power2.inOut",
                onComplete: () => {
                    overlay.style.display = "none";
                    startAnimations();
                }   
            });
        }
    });
}

// ===== 2. CONFETTI (subtle, gold-toned) =====
function createConfetti() {
    const container = document.getElementById("confetti-layer");
    const colors    = ["#C9913A", "#E8B86D", "#D4821A", "#F5DBA8"];

    for (let i = 0; i < 10; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left            = Math.random() * 100 + "vw";
        piece.style.width           =
        piece.style.height          = (Math.random() * 5 + 3) + "px";
        piece.style.background      = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 8 + 10) + "s";
        piece.style.animationDelay    = (Math.random() * 8)      + "s";
        container.appendChild(piece);
    }
}
createConfetti();

// ===== 3. HERO ANIMATIONS =====
function startAnimations() {
    startGlobalPetals();

    //const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".ganpati",            { opacity: 0, y: -18, duration: 1.2 })
      .from(".main-title",         { opacity: 0, y: 45,  duration: 1.8, ease: "expo.out"  }, "-=0.5")
      .from(".intro-text",         { opacity: 0, y: 18,  duration: 1.3                    }, "-=0.9")
      .from(".lottie-container",   { opacity: 0, scale: 0.88, duration: 1.3               }, "-=0.7")
      .from(".countdown-container",{ opacity: 0, y: 22,  duration: 1.3                    }, "-=0.7");
}

// ===== 4. SCROLL REVEALS =====

// Section titles
gsap.utils.toArray(".section-title").forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0, y: 22, duration: 1.3, ease: "power3.out"
    });
});

// Couple cards — staggered
gsap.utils.toArray(".person-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 1.3, delay: i * 0.18, ease: "power3.out"
    });
});

// Event cards — staggered
gsap.utils.toArray(".event-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0, y: 28, duration: 1.3, delay: i * 0.15, ease: "power3.out"
    });
});

// Contact card
gsap.from(".contact-card", {
    scrollTrigger: { trigger: ".contact-card", start: "top 88%", toggleActions: "play none none none" },
    opacity: 0, y: 25, duration: 1.3, ease: "power3.out"
});

// ===== 5. COUNTDOWN =====
const weddingDate = new Date("May 14, 2026 13:30:00").getTime();

function formatTime(v) { return v < 10 ? "0" + v : v; }

setInterval(() => {
    const diff  = weddingDate - Date.now();
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    document.getElementById("days").innerText  = formatTime(days);
    document.getElementById("hours").innerText = formatTime(hours);
    document.getElementById("mins").innerText  = formatTime(mins);
    document.getElementById("secs").innerText  = formatTime(secs);
}, 1000);

// ===== 6. PETALS — reduced count, Indian theme colors =====
let petalInterval = null;

function startGlobalPetals() {
    const container = document.querySelector(".global-petals");
    if (!container || petalInterval) return;

    const colors = [
        "radial-gradient(circle, #E8872A, #D4821A)",   // saffron
        "radial-gradient(circle, #E8B86D, #C9913A)",   // gold
        "radial-gradient(circle, #C9913A, #8B5E1A)",   // deep gold
        "radial-gradient(circle, #D4697A, #8B2030)",   // crimson rose
        "radial-gradient(circle, #F5DBA8, #E8B86D)",   // pale gold
    ];

    // Spawn one petal every 400ms instead of 100ms
    petalInterval = setInterval(() => {
        const petal    = document.createElement("div");
        petal.className = "petal-3d";

        const size   = Math.random() * 7 + 8;
        const driftX = Math.random() * 70 - 35;
        const dur    = Math.random() * 5 + 8;   // slower, more graceful

        petal.style.left       = Math.random() * 100 + "vw";
        petal.style.width      = size + "px";
        petal.style.height     = size + "px";
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.filter     = `blur(${Math.random() * 0.6}px)`;
        petal.style.setProperty("--driftX", driftX + "px");
        petal.style.animation  = `petalFall3D ${dur}s ease-in-out forwards`;

        container.appendChild(petal);
        setTimeout(() => petal.remove(), dur * 1000);

    }, 400);
}
