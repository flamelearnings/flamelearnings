document.addEventListener('DOMContentLoaded', function() {
  // Debug: Verify we can find the elements
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('particle-canvas');
  
  if (!hero || !canvas) {
    console.error("Critical elements missing!");
    console.log("Hero section:", hero);
    console.log("Canvas element:", canvas);
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Couldn't get canvas context");
    return;
  }

  // Initial sizing
  function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    console.log("Resized canvas to:", canvas.width, canvas.height);
  }

  // Initialize particles
  function initParticles() {
    resizeCanvas();
    
    const particles = [];
    const particleCount = Math.min(Math.floor(canvas.width / 6), 100);
    const colors = ['rgba(255,255,255,0.9)', 'rgba(200,230,255,0.9)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 3,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: colors[i % 2]
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.5 - distance/300})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Draw particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size/2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // Start everything
  initParticles();
  window.addEventListener('resize', initParticles);

  // Debug: Force redraw after 1 second
  setTimeout(() => {
    console.log("Forcing redraw...");
    initParticles();
  }, 1000);
});