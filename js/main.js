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
  setTimeout(function() { mh.style.animation = 'rot  33s linear infinite'; }, 100);
}


/* ─────────────────────────────────────────
   CONTACT FORM — BASIC SUBMIT HANDLER
───────────────────────────────────────── */
var submitBtn = document.querySelector('.form-submit');

/* Shows a calm inline message under a field instead of a jarring alert()
   popup — easier to read and less startling for older visitors. */
function showFieldError(input, message) {
  if (!input) return;
  var group = input.closest('.form-group') || input.parentElement;
  var err = group.querySelector('.form-error');
  if (!err) {
    err = document.createElement('div');
    err.className = 'form-error';
    group.appendChild(err);
  }
  err.textContent = message;
  err.classList.add('show');
  group.classList.add('has-error');
}
function clearFieldError(input) {
  if (!input) return;
  var group = input.closest('.form-group') || input.parentElement;
  var err = group.querySelector('.form-error');
  if (err) err.classList.remove('show');
  group.classList.remove('has-error');
}

if (submitBtn) {
  submitBtn.addEventListener('click', function() {
    var fname = document.querySelector('input[placeholder="Margaret"]');
    var phone = document.querySelector('input[type="tel"]');
    clearFieldError(fname);
    clearFieldError(phone);

    if (fname && fname.value.trim() === '') {
      showFieldError(fname, 'Please enter your name so Jerry knows who to ask for.');
      fname.focus();
      return;
    }
    if (phone && phone.value.trim() === '') {
      showFieldError(phone, 'Please enter a phone number so Jerry can call you back.');
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


/* ─────────────────────────────────────────
   PERSISTENT MOBILE "CALL NOW" BAR
   Older visitors often browse on a phone and don't want to hunt
   for a phone number while scrolling — keep it one tap away, always.
───────────────────────────────────────── */
(function() {
  if (document.querySelector('.sticky-call-bar')) return;
  var bar = document.createElement('div');
  bar.className = 'sticky-call-bar';
  bar.innerHTML =
    '<a class="scb-call" href="tel:8772450083" aria-label="Call Jerry now">📞 Call Now</a>'
  document.body.appendChild(bar);
})();
