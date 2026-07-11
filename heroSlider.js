// ---------------------------------------------------------
// HERO SLIDER — handles the crossfading background images.
// Reads its data from hero-images.js. You shouldn't need to
// edit this file for normal updates — edit hero-images.js instead.
// ---------------------------------------------------------

function initHeroSlider() {
  const container = document.getElementById('hero-bg-container');
  if (!container) return;

  const validImages = heroImages.filter(img => img.url);
  if (validImages.length === 0) return; // no photos yet, just show the plain background

  // Build one layer per image
  validImages.forEach((img, i) => {
    const layer = document.createElement('div');
    layer.className = 'hero-bg-layer' + (i === 0 ? ' active' : '');
    layer.style.backgroundImage = `url('${img.url}')`;
    layer.setAttribute('role', 'img');
    layer.setAttribute('aria-label', img.alt || '');
    container.appendChild(layer);
  });

  if (validImages.length < 2) return; // nothing to rotate between

  // Respect users who've asked for reduced motion — skip auto-rotation
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let activeIndex = 0;
  const layers = container.querySelectorAll('.hero-bg-layer');

  setInterval(() => {
    layers[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % layers.length;
    layers[activeIndex].classList.add('active');
  }, heroSlideDurationMs);
}

document.addEventListener('DOMContentLoaded', initHeroSlider);
