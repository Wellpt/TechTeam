document.querySelectorAll('.carousel').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const controls = carousel.querySelector('.carousel-controls');
  const count = carousel.querySelector('.carousel-count');
  const toggle = carousel.querySelector('[data-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let playing = !reducedMotion.matches;
  let timer;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    count.textContent = `${current + 1} / ${slides.length}`;
  }
  function schedule() {
    clearInterval(timer);
    toggle.textContent = playing ? 'Pausar' : 'Reproduzir';
    toggle.setAttribute('aria-label', playing ? 'Pausar rotação automática' : 'Reproduzir rotação automática');
    count.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (playing) timer = setInterval(() => show(current + 1), 5000);
  }
  controls.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-toggle')) playing = !playing;
    else if (button.dataset.direction) show(current + Number(button.dataset.direction));
    schedule();
  });
  show(0);
  controls.hidden = false;
  schedule();
});
