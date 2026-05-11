/* ============================================================
   FITI — Shared Layout Components
   Injected into every page via this script
   ============================================================ */

const NAVBAR_HTML = `
<nav class="navbar">
  <a href="index.html" class="nav-brand" style="text-decoration:none">
    <div class="logo-mark"><img src="Logo.jpeg" alt="FITI logo" /></div>
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="programs.html">Programs</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="dashboard.html">Dashboard</a></li>
  </ul>
  <div class="nav-actions">
    <a href="login.html" class="btn btn-ghost">Login</a>
    <a href="register.html" class="btn btn-primary">Register</a>
  </div>
  <div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav">
  <button class="mobile-nav-close" id="mobileNavClose">✕</button>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="programs.html">Programs</a>
  <a href="contact.html">Contact</a>
  <a href="dashboard.html">Dashboard</a>
  <div id="mobile-nav-auth">
    <a href="login.html" style="color:var(--gold)">Login</a>
    <a href="register.html" style="color:var(--gold)">Register</a>
  </div>
</div>
<div id="logout-modal" class="dialog-overlay" onclick="if (event.target === this) hideLogoutConfirm()">
  <div class="dialog-box" role="dialog" aria-modal="true" aria-labelledby="logout-modal-title">
    <h2 id="logout-modal-title">Confirm Logout</h2>
    <p>Are you sure you want to log out? You will return to the homepage.</p>
    <div class="dialog-actions">
      <button class="btn btn-outline" type="button" onclick="hideLogoutConfirm()">Cancel</button>
      <button class="btn btn-primary" type="button" onclick="confirmLogout()">Logout</button>
    </div>
  </div>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo-mark"><img src="Logo.jpeg" alt="FITI logo" /></div>
        <strong style="color:#fff;font-family:var(--font-display);font-size:1.2rem">FITI</strong>
        <p>Financial Institutions Training Institute — Building capacity for Bhutan's banking and insurance sector through world-class training and development programs.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="programs.html">Programs</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Programs</h4>
        <ul>
          <li><a href="programs.html">Banking Fundamentals</a></li>
          <li><a href="programs.html">Risk Management</a></li>
          <li><a href="programs.html">Insurance Principles</a></li>
          <li><a href="programs.html">Digital Finance</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:info@fiti.bt">info@fiti.bt</a></li>
          <li><a href="tel:+97502345678">+975 02 345 678</a></li>
          <li><a href="#">Thimphu, Bhutan</a></li>
          <li><a href="contact.html">Get in Touch</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Financial Institutions Training Institute. All rights reserved.</span>
      <span>Designed for EDP202 Assignment</span>
    </div>
  </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Inject navbar
  const navEl = document.getElementById("navbar-root");
  if (navEl) {
    navEl.innerHTML = NAVBAR_HTML;
    if (typeof updateNavAuth === "function") updateNavAuth();
    if (typeof initNavbar === "function") initNavbar();
  }

  // Inject footer
  const footEl = document.getElementById("footer-root");
  if (footEl) footEl.innerHTML = FOOTER_HTML;

  // Wire up mobile menu
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => mobileNav.classList.add("open"));
    mobileNavClose?.addEventListener("click", () =>
      mobileNav.classList.remove("open"),
    );
  }
});
