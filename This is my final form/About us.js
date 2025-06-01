// Track login state
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// DOM Elements
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

const loginDropdownLink = document.getElementById("loginDropdownLink");
const logoutDropdownLink = document.getElementById("logoutDropdownLink");
const favouritesLink = document.getElementById("favouritesLink");

/**
 * Toggles dropdown menu visibility
 */
function toggleMenuDropdown() {
  const menu = document.getElementById('dropdownMenu');
  const menuButton = document.querySelector('.menu-wrapper');
  menu.classList.toggle('open');
  menuButton.classList.toggle('filled');

  if (!menu.classList.contains('open')) {
    void menu.offsetWidth; // Fix for browser reflow
  }
}

/**
 * Opens the login popup
 */
function openPopup() {
  popup.classList.add("open-popup");
  overlay.style.display = "block";
}

/**
 * Closes the login popup
 */
function closePopup() {
  popup.classList.remove("open-popup");
  overlay.style.display = "none";
}

// Optional: Close popup on outside click
window.addEventListener("click", function(event) {
  if (event.target === overlay || event.target === popup) {
    closePopup();
  }
});

// Handle login
document.getElementById("loginBtn").addEventListener("click", function(e) {
  const studentNumber = document.querySelectorAll("input")[0].value.trim();
  const password = document.querySelectorAll("input")[1].value.trim();

  if (!studentNumber || !password) {
    alert("Please enter both Student Number and Password.");
    e.preventDefault();
  } else {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    closePopup();
    updateDropdownLinks();
    alert("Logging in...");
  }
});

// Update dropdown links based on login state
function updateDropdownLinks() {
  if (isLoggedIn) {
    if (loginDropdownLink) loginDropdownLink.style.display = "none";
    if (logoutDropdownLink) logoutDropdownLink.style.display = "flex";
    if (favouritesLink) favouritesLink.style.display = "flex";
  } else {
    if (loginDropdownLink) loginDropdownLink.style.display = "block";
    if (logoutDropdownLink) logoutDropdownLink.style.display = "none";
    if (favouritesLink) favouritesLink.style.display = "none";
  }
}

// Logout function
function logout() {
  isLoggedIn = false;
  localStorage.removeItem("isLoggedIn");
  updateDropdownLinks();
  alert("You have been logged out.");
}

// Fade-in animations
const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Scroll to top button
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Run on page load
window.addEventListener("DOMContentLoaded", () => {
  updateDropdownLinks();
});