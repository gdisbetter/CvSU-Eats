let isLoggedIn = false;

// DOM Elements
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

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

window.addEventListener("click", function(event) {
  if (event.target === overlay) {
    closePopup();
  }
});

document.getElementById("loginBtn").addEventListener("click", function(e) {
  const studentNumber = document.querySelectorAll("input")[0].value.trim();
  const password = document.querySelectorAll("input")[1].value.trim();

  if (!studentNumber || !password) {
    alert("Please enter both Student Number and Password.");
    e.preventDefault(); // Stop form submission
  } else {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    closePopup();
    updateDropdownLinks();
    alert("Logging in...");
  }
});

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

function logout() {
  isLoggedIn = false;
  localStorage.removeItem("isLoggedIn");
  updateDropdownLinks();
  alert("You have been logged out.");
}

window.addEventListener("DOMContentLoaded", () => {
  isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  updateDropdownLinks();
});

// Scroll-to-top button logic
const backToTopBtn = document.getElementById("scrollTopBtn");
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