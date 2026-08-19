// PERSONALIZE HERE: change these values first.
const CONFIG = {
  password: "sister123",
  sisterName: "Sister's Name",
  birthDate: "2000-08-07T00:00:00",
  musicSrc: "", // Example: "assets/audio/song.mp3"
  heroLine: "Today is all about you...",
  letter: `Dear sister,

You are the kind of person who makes ordinary days feel softer, funnier, and brighter.
Thank you for the memories, the laughter, the comfort, and the beautiful chaos only you can bring.

On your birthday, I hope you feel as loved as you have always made everyone around you feel.
Keep dreaming, keep glowing, and keep smiling forever.

Happy Birthday. I love you endlessly.`
};

// Replace these with your own image files, for example: "assets/images/photo1.jpg".
const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=82",
    alt: "Warm celebration lights"
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=82",
    alt: "Birthday cake with candles"
  },
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=82",
    alt: "Pastel party balloons"
  },
  {
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=82",
    alt: "Elegant dinner celebration"
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=82",
    alt: "Golden party table"
  },
  {
    src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=82",
    alt: "Pretty dessert moment"
  }
];

const timelineItems = [
  ["🌸 Childhood", "Tiny hands, huge dreams, and the cutest little stories that still make everyone smile."],
  ["🎒 School Days", "Homework, uniforms, lunchbox memories, and the beginning of your brave little adventures."],
  ["😂 Funny Moments", "The jokes, the teasing, the dramatic faces, and the memories we still laugh about."],
  ["❤️ Family Memories", "Festivals, photos, quiet support, and the love that always finds its way home."],
  ["✨ Today", "Another beautiful year of you. Stronger, brighter, kinder, and more magical than ever."]
];

const reasons = [
  ["❤️", "Caring", "You notice feelings before people even say them."],
  ["😂", "Funny", "You can turn a normal room into a memory."],
  ["🌸", "Strong", "You keep going with grace, even on difficult days."],
  ["✨", "Inspiring", "You make people want to become softer and better."],
  ["🤍", "Beautiful Soul", "Your heart is your most unforgettable thing."]
];

const quizQuestions = [
  {
    question: "What is my favorite color?",
    options: ["Pink", "Blue", "Black"],
    answer: "Pink"
  },
  {
    question: "Where did we first travel together?",
    options: ["The beach", "A hill station", "Grandma's house"],
    answer: "Grandma's house"
  },
  {
    question: "When do I get angry?",
    options: ["When food is shared", "When someone hides snacks", "When plans are late"],
    answer: "When someone hides snacks"
  }
];

const wheelPrizes = ["🍫 Chocolate", "🎁 Surprise Gift", "🤗 Hug", "🍕 Pizza", "🎬 Movie Night", "💐 Flowers"];
const giftSurprises = [
  "You deserve a day full of tiny miracles.",
  "Emergency happiness coupon: valid forever.",
  "A heart explosion has been scheduled in your honor.",
  "You are loved more than words can behave.",
  "Today's official rule: no sadness allowed."
];

const $ = (selector) => document.querySelector(selector);
const create = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

let unlocked = false;
let celebrationMode = false;
let audio = null;
let audioContext = null;
let masterGain = null;

window.addEventListener("load", () => {
  setTimeout(() => $("#loadingScreen").classList.add("hidden"), 900);
  initializeSite();
});

function initializeSite() {
  $("#sisterName").textContent = `${CONFIG.sisterName} ❤️`;
  $("#heroImage").src = galleryPhotos[1].src;

  renderDecorations();
  renderCountdown();
  renderTimeline();
  renderGallery();
  renderReasons();
  renderQuiz();
  renderWheel();
  renderWishes();
  renderGifts();
  bindEvents();

  setInterval(renderCountdown, 1000);
  startFireworks();
}

function bindEvents() {
  $("#passwordForm").addEventListener("submit", handlePasswordSubmit);
  $("#musicToggle").addEventListener("click", toggleMusic);
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#envelope").addEventListener("click", openLetter);
  $("#spinButton").addEventListener("click", spinWheel);
  $("#wishForm").addEventListener("submit", saveWish);
  $("#cakeStage").addEventListener("click", blowCandles);
  $("#celebrateButton").addEventListener("click", finalCelebrate);
  $("#secretHeart").addEventListener("click", () => $("#bonusModal").classList.remove("hidden"));
  $("#bonusModal").addEventListener("click", () => $("#bonusModal").classList.add("hidden"));
  $("#lightbox").addEventListener("click", () => $("#lightbox").classList.add("hidden"));

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("mousemove", createCursorHeart, { passive: true });
}

function handlePasswordSubmit(event) {
  event.preventDefault();
  const form = $("#passwordForm");
  const input = $("#passwordInput");
  const lockScreen = $("#lockScreen");
  const lockIcon = $("#lockIcon");
  const error = $("#lockError");

  if (input.value === CONFIG.password) {
    error.textContent = "";
    lockIcon.classList.add("unlocking");
    lockIcon.innerHTML = '<i class="fa-solid fa-lock-open"></i>';
    lockScreen.classList.add("unlocking");

    setTimeout(() => {
      unlocked = true;
      lockScreen.classList.add("hidden");
      $("#experience").classList.remove("hidden");
      typeText($("#heroTypewriter"), CONFIG.heroLine, 46);
      burstFirework(window.innerWidth / 2, window.innerHeight * 0.28, 70);
    }, 850);
    return;
  }

  error.textContent = "Oops! That's not the magic word ❤️";
  form.classList.remove("shake");
  void form.offsetWidth;
  form.classList.add("shake");
}

function renderCountdown() {
  const time = getTimeSince(CONFIG.birthDate);
  const units = [
    ["Years", time.years],
    ["Months", time.months],
    ["Days", time.days],
    ["Hours", pad(time.hours)],
    ["Minutes", pad(time.minutes)],
    ["Seconds", pad(time.seconds)]
  ];

  $("#countdownGrid").innerHTML = units
    .map(([label, value]) => `<article class="stat-card glass"><strong>${value}</strong><span>${label}</span></article>`)
    .join("");
}

function getTimeSince(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  let cursor = new Date(start);

  let years = now.getFullYear() - cursor.getFullYear();
  cursor.setFullYear(cursor.getFullYear() + years);
  if (cursor > now) {
    years -= 1;
    cursor = new Date(start);
    cursor.setFullYear(cursor.getFullYear() + years);
  }

  let months = (now.getFullYear() - cursor.getFullYear()) * 12 + now.getMonth() - cursor.getMonth();
  cursor.setMonth(cursor.getMonth() + months);
  if (cursor > now) {
    months -= 1;
    cursor.setMonth(cursor.getMonth() - 1);
  }

  const diff = Math.max(0, now - cursor);
  return {
    years,
    months,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

function pad(value) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function renderTimeline() {
  const container = $("#timelineList");
  container.innerHTML = "";

  timelineItems.forEach(([title, body], index) => {
    const card = create("button", `timeline-card glass ${index === 0 ? "is-open" : ""}`);
    card.type = "button";
    card.innerHTML = `<span>${title}</span><p>${body}</p>`;
    card.addEventListener("click", () => {
      document.querySelectorAll(".timeline-card").forEach((item) => item.classList.remove("is-open"));
      card.classList.add("is-open");
    });
    container.appendChild(card);
  });
}

function renderGallery() {
  const grid = $("#galleryGrid");
  grid.innerHTML = "";

  galleryPhotos.forEach((photo) => {
    const button = create("button", "gallery-item");
    button.type = "button";
    button.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy" />`;
    button.addEventListener("click", () => {
      $("#lightboxImage").src = photo.src;
      $("#lightbox").classList.remove("hidden");
    });
    grid.appendChild(button);
  });
}

function openLetter() {
  const envelope = $("#envelope");
  const paper = $("#letterPaper");
  envelope.classList.add("is-open");
  paper.classList.remove("hidden");
  paper.textContent = "";
  typeText(paper, CONFIG.letter, 24);
}

function renderReasons() {
  $("#reasonGrid").innerHTML = reasons
    .map(
      ([icon, title, body]) => `
        <article class="reason-card glass">
          <span class="reason-icon">${icon}</span>
          <h3>${title}</h3>
          <p>${body}</p>
        </article>
      `
    )
    .join("");
}

function renderQuiz() {
  const list = $("#quizList");
  list.innerHTML = "";

  quizQuestions.forEach((quiz) => {
    const card = create("article", "quiz-card glass");
    const options = quiz.options
      .map((option) => `<button type="button" data-option="${option}">${option}</button>`)
      .join("");

    card.innerHTML = `<h3>${quiz.question}</h3><div class="quiz-options">${options}</div><p></p>`;
    const message = card.querySelector("p");

    card.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        card.querySelectorAll("button").forEach((item) => item.classList.remove("correct", "wrong"));
        const isCorrect = button.dataset.option === quiz.answer;
        button.classList.add(isCorrect ? "correct" : "wrong");
        message.textContent = isCorrect ? "Correct! Tiny celebration unlocked ✨" : "Almost. The memory archive disagrees.";
        if (isCorrect) burstFirework(window.innerWidth * 0.78, window.innerHeight * 0.24, 34);
      });
    });

    list.appendChild(card);
  });
}

function renderWheel() {
  $("#wheel").innerHTML = wheelPrizes
    .map((prize, index) => `<span style="transform: rotate(${index * 60}deg)">${prize}</span>`)
    .join("");
}

function spinWheel() {
  const prizeIndex = Math.floor(Math.random() * wheelPrizes.length);
  const slice = 360 / wheelPrizes.length;
  const currentRotation = Number($("#wheel").dataset.rotation || "0");
  const nextRotation = currentRotation + 1440 + (360 - prizeIndex * slice) + Math.random() * 20;

  $("#wheel").dataset.rotation = String(nextRotation);
  $("#wheel").style.transform = `rotate(${nextRotation}deg)`;
  $("#wheelResult").textContent = "";
  setTimeout(() => {
    $("#wheelResult").textContent = `You won: ${wheelPrizes[prizeIndex]}`;
    burstFirework(window.innerWidth / 2, window.innerHeight * 0.3, 42);
  }, 2300);
}

function renderWishes() {
  const wishes = JSON.parse(localStorage.getItem("birthday-wishes") || "[]");
  $("#wishesGrid").innerHTML = wishes.length
    ? wishes.map((wish) => `<p class="glass">${escapeHtml(wish)}</p>`).join("")
    : '<p class="glass">Your first wish will sparkle here.</p>';
}

function saveWish(event) {
  event.preventDefault();
  const input = $("#wishInput");
  const wish = input.value.trim();
  if (!wish) return;

  const wishes = JSON.parse(localStorage.getItem("birthday-wishes") || "[]");
  localStorage.setItem("birthday-wishes", JSON.stringify([wish, ...wishes].slice(0, 10)));
  input.value = "";
  renderWishes();
}

function blowCandles() {
  $("#cakeStage").classList.add("candles-out");
  $("#wishMessage").classList.remove("hidden");
  burstFirework(window.innerWidth / 2, window.innerHeight * 0.22, 54);
}

function renderGifts() {
  const grid = $("#giftGrid");
  grid.innerHTML = "";

  for (let index = 0; index < 4; index += 1) {
    const button = create("button", "gift-box");
    button.type = "button";
    button.innerHTML = '<i class="fa-solid fa-gift"></i>';
    button.addEventListener("click", () => {
      const message = giftSurprises[Math.floor(Math.random() * giftSurprises.length)];
      $("#surpriseMessage").textContent = message;
      $("#surpriseMessage").classList.remove("hidden");
      createHeartExplosion(button);
    });
    grid.appendChild(button);
  }
}

function finalCelebrate() {
  celebrationMode = true;
  $("#celebrationOverlay").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setMusicVolume(0.16);

  const finale = setInterval(() => {
    burstFirework(Math.random() * window.innerWidth, window.innerHeight * (0.12 + Math.random() * 0.35), 70);
  }, 280);

  setTimeout(() => {
    clearInterval(finale);
    celebrationMode = false;
    $("#celebrationOverlay").classList.add("hidden");
    setMusicVolume(0.09);
  }, 7600);
}

function renderDecorations() {
  const decor = $("#decorLayer");
  decor.innerHTML = "";

  for (let index = 0; index < 12; index += 1) {
    const balloon = create("span", "balloon");
    balloon.style.left = `${4 + index * 8}%`;
    balloon.style.animationDelay = `${index * -1.8}s`;
    decor.appendChild(balloon);
  }

  for (let index = 0; index < 44; index += 1) {
    const confetti = create("span", "confetti");
    confetti.style.left = `${(index * 37) % 100}%`;
    confetti.style.animationDelay = `${index * -0.25}s`;
    decor.appendChild(confetti);
  }

  ["12%,24%", "82%,38%", "46%,82%"].forEach((position) => {
    const [left, top] = position.split(",");
    const sparkle = create("span", "sparkle");
    sparkle.style.left = left;
    sparkle.style.top = top;
    decor.appendChild(sparkle);
  });
}

function createCursorHeart(event) {
  if (!unlocked) return;

  const heart = create("span", "cursor-heart", "❤️");
  heart.style.left = `${event.clientX}px`;
  heart.style.top = `${event.clientY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1100);
}

function createHeartExplosion(source) {
  const rect = source.getBoundingClientRect();
  for (let index = 0; index < 12; index += 1) {
    setTimeout(() => {
      createCursorHeart({
        clientX: rect.left + rect.width / 2 + (Math.random() - 0.5) * 90,
        clientY: rect.top + rect.height / 2 + (Math.random() - 0.5) * 70
      });
    }, index * 35);
  }
}

function typeText(element, text, speed) {
  element.classList.add("type-caret");
  element.textContent = "";
  let index = 0;

  const timer = setInterval(() => {
    index += 1;
    element.textContent = text.slice(0, index);
    if (index >= text.length) {
      clearInterval(timer);
      element.classList.remove("type-caret");
    }
  }, speed);
}

function toggleTheme() {
  const site = $("#birthdaySite");
  site.classList.toggle("night-mode");
  $("#themeToggle").innerHTML = site.classList.contains("night-mode")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

async function toggleMusic() {
  const button = $("#musicToggle");

  if (audio || audioContext) {
    stopMusic();
    button.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    return;
  }

  if (CONFIG.musicSrc) {
    audio = new Audio(CONFIG.musicSrc);
    audio.loop = true;
    audio.volume = celebrationMode ? 0.5 : 0.28;
    await audio.play();
  } else {
    startSynthMusic();
  }

  button.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
}

function startSynthMusic() {
  const AudioClass = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioClass();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioContext.destination);

  [261.63, 329.63, 392, 493.88, 523.25].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const toneGain = audioContext.createGain();
    oscillator.type = index % 2 === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    toneGain.gain.value = 0.018 - index * 0.002;
    oscillator.connect(toneGain);
    toneGain.connect(masterGain);
    oscillator.start();
  });

  setMusicVolume(0.09);
}

function stopMusic() {
  if (audio) {
    audio.pause();
    audio = null;
  }

  if (audioContext) {
    audioContext.close();
    audioContext = null;
    masterGain = null;
  }
}

function setMusicVolume(volume) {
  if (audio) audio.volume = volume * 3;
  if (masterGain && audioContext) {
    masterGain.gain.setTargetAtTime(volume, audioContext.currentTime, 0.35);
  }
}

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $("#scrollProgress").style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Canvas fireworks are kept separate from the DOM animations for smoother performance.
function startFireworks() {
  const canvas = $("#fireworksCanvas");
  const context = canvas.getContext("2d");
  const particles = [];
  const colors = ["#ff7ab6", "#ffd166", "#b8a7ff", "#ffffff", "#f8c7ff"];
  let frame = 0;

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  window.burstFirework = (x, y, amount = 34) => {
    for (let index = 0; index < amount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.6 + Math.random() * 5.6;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 54 + Math.random() * 48,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.2 + Math.random() * 2.8
      });
    }
  };

  function draw() {
    frame += 1;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.globalCompositeOperation = "lighter";

    if (unlocked && frame % 95 === 0) {
      burstFirework(window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.12 + Math.random() * 0.36), celebrationMode ? 70 : 26);
    }

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.035;
      particle.life -= 1;

      context.globalAlpha = Math.max(0, particle.life / 90);
      context.fillStyle = particle.color;
      context.shadowColor = particle.color;
      context.shadowBlur = 14;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();

      if (particle.life <= 0) particles.splice(index, 1);
    });

    context.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}
