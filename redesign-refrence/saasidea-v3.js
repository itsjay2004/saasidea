// Reveal on scroll
const rvEls = document.querySelectorAll('.rv');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced || !('IntersectionObserver' in window)) {
  rvEls.forEach(el => el.classList.add('in'));
} else {
  const ro = new IntersectionObserver(
    (entries, obs) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    }),
    { threshold: .07, rootMargin: '0px 0px -30px 0px' }
  );
  rvEls.forEach(el => ro.observe(el));
}

// FAQ accordion (single-open)
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isActive = btn.classList.contains('active');
    document.querySelectorAll('.faq-question').forEach(q => {
      q.classList.remove('active');
      q.nextElementSibling.style.maxHeight = '0';
    });
    if (!isActive) {
      btn.classList.add('active');
      btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
    }
  });
});
