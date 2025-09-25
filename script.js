// Simple JS: mobile menu, smooth-scroll, form validation (no external calls)
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('#menuBtn');
  const mobile = document.querySelector('#mobileMenu');

  menuBtn?.addEventListener('click', () => {
    const open = mobile.style.display === 'block';
    mobile.style.display = open ? 'none' : 'block';
    menuBtn.setAttribute('aria-expanded', String(!open));
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobile) mobile.style.display = 'none';
      }
    });
  });

  // Trivial client-side validation
  const form = document.querySelector('#contactForm');
  const notice = document.querySelector('#formNotice');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const nameOk = String(data.name || '').trim().length > 0;
    const emailOk = String(data.email || '').includes('@');
    const msgOk = String(data.message || '').trim().length > 0;

    if (!nameOk || !emailOk || !msgOk) {
      notice.innerHTML = '<span class="err">Please fill name, a valid email, and your message.</span>';
      return;
    }

    // mailto fallback (replace with backend / Netlify form if desired)
    const subject = encodeURIComponent('New enquiry from ÒSRaf website');
    const body = encodeURIComponent(
      `Name: ${data.name}\nPhone: ${data.phone || ''}\nService: ${data.service}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:contact@osraf.is?subject=${subject}&body=${body}`;
    notice.innerHTML = '<span class="ok">Got it! Your email client is opening…</span>';
    form.reset();
  });
});
