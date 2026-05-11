/* ============================================================
   FITI — Shared JavaScript Utilities
   ============================================================ */

// ── LocalStorage Auth Helpers ────────────────────────────
const Auth = {
  USERS_KEY: "fiti_users",
  SESSION_KEY: "fiti_session",

  getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || "[]");
  },
  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },
  register(data) {
    const users = this.getUsers();
    if (users.find((u) => u.email === data.email)) {
      return { ok: false, msg: "An account with this email already exists." };
    }
    users.push({
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    this.saveUsers(users);
    return { ok: true };
  },
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) return { ok: false, msg: "Invalid email or password." };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return { ok: true, user };
  },
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = "index.html";
  },
  currentUser() {
    return JSON.parse(localStorage.getItem(this.SESSION_KEY) || "null");
  },
  isLoggedIn() {
    return !!this.currentUser();
  },
};

// ── Toast Notifications ──────────────────────────────────
function showToast(msg, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity .4s";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ── Navbar ───────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  // Scroll effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  // Active link
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === currentPage) a.classList.add("active");
  });

  // Auth state
  updateNavAuth();

  // Mobile menu
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileClose = document.querySelector(".mobile-nav-close");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => mobileNav.classList.add("open"));
    mobileClose?.addEventListener("click", () =>
      mobileNav.classList.remove("open"),
    );
  }
}

function updateNavAuth() {
  const user = Auth.currentUser();
  const navActions = document.querySelector(".nav-actions");
  const mobileNavAuth = document.querySelector("#mobile-nav-auth");

  if (navActions) {
    if (user) {
      navActions.innerHTML = `
        <span class="btn btn-ghost" style="pointer-events:none; opacity:.8">
          👤 ${user.firstName || user.name || "User"}
        </span>
        <button class="btn btn-primary" onclick="handleLogout()">Logout</button>
      `;
    }
  }

  if (mobileNavAuth) {
    if (user) {
      mobileNavAuth.innerHTML = `
        <span style="display:block; padding: 0.75rem 1rem; color:var(--slate)">👤 ${user.firstName || user.name || "User"}</span>
        <button onclick="handleLogout()" style="display:block; width:100%; padding: 0.75rem 1rem; color:var(--gold); background:none; border:none; text-align:left; cursor:pointer; font-weight:500">Logout</button>
      `;
    }
  }
}

function showLogoutConfirm() {
  const modal = document.getElementById("logout-modal");
  if (!modal) return;
  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function hideLogoutConfirm() {
  const modal = document.getElementById("logout-modal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

function confirmLogout() {
  hideLogoutConfirm();
  Auth.logout();
}

function handleLogout() {
  showLogoutConfirm();
}

// ── Enrollment/Protected Actions ──────────────────────────
function requireLogin(redirectUrl = null) {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function enrollProgram(programName) {
  if (!requireLogin()) return;
  showToast(
    `You've enrolled in ${programName}! Check your dashboard for details.`,
    "success",
  );
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1500);
}

// ── Form Validation Helpers ──────────────────────────────
function validateField(input, rules = {}) {
  const val = input.value.trim();
  let error = "";

  if (rules.required && !val) error = "This field is required.";
  else if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
    error = "Enter a valid email address.";
  else if (rules.minLen && val.length < rules.minLen)
    error = `Minimum ${rules.minLen} characters required.`;
  else if (rules.match && val !== rules.match())
    error = "Passwords do not match.";
  else if (rules.phone && !/^\+?[\d\s\-()]{7,15}$/.test(val))
    error = "Enter a valid phone number.";

  const errEl = input.parentElement.querySelector(".form-error");
  if (errEl) {
    errEl.textContent = error;
    errEl.classList.toggle("visible", !!error);
  }
  input.classList.toggle("error", !!error);
  return !error;
}

// ── Smooth scroll for anchor links ───────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ── Page fade-in ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity .4s";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
  initNavbar();
  initSmoothScroll();
});
