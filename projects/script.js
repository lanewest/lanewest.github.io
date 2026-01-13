// ============================================
// SHARED PROJECT PAGE JAVASCRIPT
// ============================================

// Typing effect
const typingElement = document.getElementById('typing-text');
if (typingElement) {
  const textToType = typingElement.getAttribute('data-text') || "Exploring innovative solutions";
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < textToType.length) {
      typingElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 80);
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// Navbar scroll effect
const navbar = document.querySelector('.project-topbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
  });
}

// Enhanced parallax effect with brightness control
let mouseMoving = false;
let mouseMoveTimeout;
let currentBrightness = 0.08;
let targetBrightness = 0.05;
const maxBrightness = 0.4;
const minBrightness = 0.05;
const brightnessIncrement = 0.0075;
const dimSpeed = 0.0003;

window.addEventListener('mousemove', (e) => {
  mouseMoving = true;
  
  targetBrightness = Math.min(targetBrightness + brightnessIncrement, maxBrightness);
  
  clearTimeout(mouseMoveTimeout);
  
  mouseMoveTimeout = setTimeout(() => {
    mouseMoving = false;
    targetBrightness = minBrightness;
  }, 150);

  // Parallax effect
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
    const speed = (index + 1) * 20;
    const x = mouseX * speed;
    const y = mouseY * speed;
    
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Smooth brightness animation loop
function animateBrightness() {
  if (currentBrightness < targetBrightness) {
    currentBrightness = Math.min(currentBrightness + 0.005, targetBrightness);
  } else if (currentBrightness > targetBrightness) {
    currentBrightness = Math.max(currentBrightness - dimSpeed, targetBrightness);
  }

  document.querySelectorAll('.gradient-orb').forEach((orb) => {
    orb.style.opacity = currentBrightness;
  });

  requestAnimationFrame(animateBrightness);
}

// Start the brightness animation loop
animateBrightness();