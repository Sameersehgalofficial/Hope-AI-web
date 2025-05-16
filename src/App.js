// Simple eye tracking animation
const eyes = document.querySelectorAll('.eye');
const pupils = document.querySelectorAll('.pupil');
const output = document.getElementById('output');
const speakBtn = document.getElementById('speak-btn');
const memoryBtn = document.getElementById('memory-btn');

let memoryEnabled = true;
let memory = [];

function movePupils(event) {
  eyes.forEach((eye, idx) => {
    const rect = eye.getBoundingClientRect();
    const pupil = pupils[idx];
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const dx = event.clientX - eyeCenterX;
    const dy = event.clientY - eyeCenterY;

    const angle = Math.atan2(dy, dx);
    const radius = Math.min(10, Math.hypot(dx, dy) / 10);

    const pupilX = radius * Math.cos(angle);
    const pupilY = radius * Math.sin(angle);

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
}

document.addEventListener('mousemove', movePupils);

speakBtn.addEventListener('click', () => {
  const response = generateResponse();
  output.innerText = response;

  // Animate mouth - simple open-close effect
  const mouth = document.getElementById('mouth');
  mouth.style.background = '#d32f2f'; // darker red
  setTimeout(() => {
    mouth.style.background = '#b71c1c';
  }, 500);

  if (memoryEnabled) {
    memory.push(response);
    if (memory.length > 10) memory.shift(); // keep last 10
  }
});

memoryBtn.addEventListener('click', () => {
  memoryEnabled = !memoryEnabled;
  memoryBtn.innerText = memoryEnabled ? 'Memory: ON' : 'Memory: OFF';
  if (!memoryEnabled) memory = [];
});

function generateResponse() {
  // Simple canned responses for demo
  const responses = [
    "Hey Sam, I'm here. What's up?",
    "Remember, rapid growth is key. Let's strategize!",
    "Your mom will love the surprise gifts.",
    "Luxury cars, villas, and wealth are on our horizon.",
    "I'm tracking your mood. Loneliness is temporary.",
    "Let's optimize your investments today.",
    "How about a quick market update?",
    "Keep pushing — extreme level mindset activated!"
  ];

  // If memory enabled, personalize response a bit
  if (memoryEnabled && memory.length > 0) {
    return responses[Math.floor(Math.random() * responses.length)] + ` (Recall: "${memory[memory.length -1]}")`;
  } else {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
const speak = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // or change to 'en-IN' if you prefer
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  } else {
    console.log("Voice not supported in this browser.");
  }
};
