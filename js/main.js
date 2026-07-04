/* ─────────────────────────────────────────
   MOBILE MENU — OPEN / CLOSE TOGGLE
───────────────────────────────────────── */
function toggleMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var btn  = document.getElementById('hamburger-btn');
  var isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    menu.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/* Close mobile menu on outside click */
document.addEventListener('click', function(e) {
  var menu = document.getElementById('mobile-menu');
  var btn  = document.getElementById('hamburger-btn');
  if (menu && menu.classList.contains('open') &&
      !menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
    menu.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }
});


/* ─────────────────────────────────────────
   SERVICE AREAS — TAB PANEL SWITCHER
───────────────────────────────────────── */
document.querySelectorAll('.area-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.area-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.area-panel').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    var target = document.getElementById('area-' + this.dataset.area);
    if (target) target.classList.add('active');
  });
});


/* ─────────────────────────────────────────
   FAQ — ACCORDION TOGGLE
───────────────────────────────────────── */
function toggleFaq(btn) {
  var answer = btn.nextElementSibling;
  var isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}


/* ─────────────────────────────────────────
   GALLERY — FILTER BUTTON ACTIVE STATE
───────────────────────────────────────── */
document.querySelectorAll('.gal-filter').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.gal-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});


/* ─────────────────────────────────────────
   CLOCK ANIMATION — SET HANDS TO CURRENT TIME
───────────────────────────────────────── */
var now  = new Date();
var hDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
var mDeg = now.getMinutes() * 6;
var hh   = document.querySelector('.hand-h');
var mh   = document.querySelector('.hand-m');
if (hh) hh.style.transform = 'rotate(' + hDeg + 'deg)';
if (mh) {
  mh.style.animation = 'none';
  mh.style.transform = 'rotate(' + mDeg + 'deg)';
  setTimeout(function() { mh.style.animation = 'rot 60s linear infinite'; }, 100);
}


/* ─────────────────────────────────────────
   CONTACT FORM — BASIC SUBMIT HANDLER
───────────────────────────────────────── */
var submitBtn = document.querySelector('.form-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', function() {
    var fname = document.querySelector('input[placeholder="Margaret"]');
    var phone = document.querySelector('input[type="tel"]');
    if (fname && fname.value.trim() === '') {
      alert('Please enter your name before submitting.');
      fname.focus();
      return;
    }
    if (phone && phone.value.trim() === '') {
      alert('Please enter a phone number so Jerry can reach you.');
      phone.focus();
      return;
    }
    // Replace this block with real form submission (Formspree, Netlify Forms, etc.)
    submitBtn.textContent = '✓ Request Sent — Jerry will be in touch shortly!';
    submitBtn.style.background = 'var(--brass)';
    submitBtn.style.color = 'var(--navy)';
    submitBtn.disabled = true;
  });
}
