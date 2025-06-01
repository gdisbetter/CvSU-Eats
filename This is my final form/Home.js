// Track login state
let isLoggedIn = false;
const overlay = document.getElementById("overlay");
// DOM Elements
const popup = document.getElementById("popup");
const loginDropdownLink = document.getElementById("loginDropdownLink");
const logoutDropdownLink = document.getElementById("logoutDropdownLink");
const favouritesLink = document.getElementById("favouritesLink");

function toggleMenuDropdown() {
  const menu = document.getElementById('dropdownMenu');
  const menuButton = document.querySelector('.menu-wrapper');
  menu.classList.toggle('open');
  menuButton.classList.toggle('filled');
  if (!menu.classList.contains('open')) {
    void menu.offsetWidth; // Fix for browser reflow
  }
}

function openPopup() {
  popup.classList.add("open-popup");
  overlay.style.display = "block";
}

function closePopup() {
  popup.classList.remove("open-popup");
  overlay.style.display = "none";
}

// Optional: Close popup when clicking outside
window.addEventListener("click", function(event) {
  if (event.target === overlay) {
    closePopup();
  }
});

// Check login state on page load
window.addEventListener("DOMContentLoaded", () => {
  isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  updateDropdownLinks();
});

// Handle Login
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

// Update Dropdown Links
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

// Logout Function
function logout() {
  isLoggedIn = false;
  localStorage.removeItem("isLoggedIn");
  updateDropdownLinks();
  alert("You have been logged out.");
}

const fadeEls = document.querySelectorAll('.cards .card, .main-content, .second-main-content');

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target); // Stop observing after it's visible
    }
  });
}, {
  threshold: 0.2
});

fadeEls.forEach(el => {
  el.classList.add('fade-up'); // Add initial class
  appearOnScroll.observe(el);
});
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});