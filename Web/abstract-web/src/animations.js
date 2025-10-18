const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.resource-card, .member-card, .hero-section, .resources-section, .team-section');
  
  animatedElements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });
});

const style = document.createElement('style');
style.textContent = `
  .scroll-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .scroll-animate.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .resource-card.scroll-animate {
    transform: translateY(40px) scale(0.95);
  }
  
  .resource-card.scroll-animate.animate-in {
    transform: translateY(0) scale(1);
  }
  
  .member-card.scroll-animate {
    transform: translateY(50px) rotateX(10deg);
  }
  
  .member-card.scroll-animate.animate-in {
    transform: translateY(0) rotateX(0deg);
  }
`;
document.head.appendChild(style);
