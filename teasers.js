// Keep the homepage quiet until a visitor hovers over or plays a teaser.
const teasers = [...document.querySelectorAll('.teaser-frame video')];
const hoverPreview = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

teasers.forEach((video) => {
  const frame = video.closest('.teaser-frame');
  const button = frame.querySelector('.teaser-toggle');
  const title = button.getAttribute('aria-label').replace(/^Play /, '');
  video.controls = false;
  button.hidden = false;

  const updateButton = () => {
    button.setAttribute('aria-pressed', String(!video.paused));
    button.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${title}`);
    button.querySelector('span').textContent = video.paused ? '▶ Play teaser' : 'Ⅱ Pause teaser';
  };

  const play = () => {
    teasers.forEach((other) => {
      if (other !== video) other.pause();
    });
    video.play().catch(() => updateButton());
  };

  button.addEventListener('click', () => {
    if (video.paused) play();
    else video.pause();
  });

  frame.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' && hoverPreview.matches && !reducedMotion.matches) play();
  });

  frame.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && hoverPreview.matches) video.pause();
  });

  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('error', () => {
    button.hidden = true;
    video.controls = true;
  });
});

const visibility = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (!isIntersecting) target.pause();
  });
});
teasers.forEach((video) => visibility.observe(video));

document.addEventListener('visibilitychange', () => {
  if (document.hidden) teasers.forEach((video) => video.pause());
});
