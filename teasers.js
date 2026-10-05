// Preview on mouse hover; tap the video to toggle playback.
const teasers = [...document.querySelectorAll('.teaser-frame video')];

teasers.forEach((video) => {
  const frame = video.closest('.teaser-frame');
  video.muted = true;
  const play = () => {
    teasers.forEach((other) => {
      if (other !== video) other.pause();
    });
    video.play().catch((error) => console.warn('Unable to play teaser:', error));
  };

  // Cover the initial decode/paint gap, then retain the video frame on pause.
  video.addEventListener('playing', () => {
    if (frame.classList.contains('has-frame')) return;
    const reveal = () => requestAnimationFrame(() => frame.classList.add('has-frame'));
    if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(reveal);
    else reveal();
  });

  frame.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') play();
  });

  frame.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') video.pause();
  });

  frame.addEventListener('click', () => {
    if (video.paused) play();
    else video.pause();
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
