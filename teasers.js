// Play a silent preview only while the mouse is over a teaser.
const teasers = [...document.querySelectorAll('.teaser-frame video')];
const hoverPreview = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

teasers.forEach((video) => {
  const frame = video.closest('.teaser-frame');
  const play = () => {
    teasers.forEach((other) => {
      if (other !== video) other.pause();
    });
    video.play().catch(() => {});
  };

  frame.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' && hoverPreview.matches && !reducedMotion.matches) play();
  });

  frame.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && hoverPreview.matches) video.pause();
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
