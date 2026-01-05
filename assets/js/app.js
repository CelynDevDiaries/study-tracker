// Lightweight UI enhancements that do not conflict with existing inline logic
// Adds active hover effect and minor usability polish

document.addEventListener('DOMContentLoaded', () => {
  // Button focus style for accessibility
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Add a subtle ripple effect on buttons
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('.btn');
    if (!target) return;
    const circle = document.createElement('span');
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + 'px';
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255,255,255,0.4)';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.pointerEvents = 'none';
    circle.style.left = (e.clientX - rect.left) + 'px';
    circle.style.top = (e.clientY - rect.top) + 'px';
    circle.style.animation = 'btn-ripple 600ms ease-out';
    circle.className = 'btn-ripple';
    target.style.position = 'relative';
    target.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  });
});

// Inject ripple keyframes once
(() => {
  const id = 'btn-ripple-style';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `@keyframes btn-ripple { from { opacity: 1; transform: translate(-50%, -50%) scale(0.2); } to { opacity: 0; transform: translate(-50%, -50%) scale(2.2); } }`;
  document.head.appendChild(style);
})();
