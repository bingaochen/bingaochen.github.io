// Play a silent preview only while the mouse is over a teaser.
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

  frame.addEventListener('mouseenter', play);

  frame.addEventListener('mouseleave', () => video.pause());
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
