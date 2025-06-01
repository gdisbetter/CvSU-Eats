// Track login state using localStorage
let isLoggedIn = false;

// DOM Elements
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

const loginDropdownLink = document.getElementById("loginDropdownLink");
const logoutDropdownLink = document.getElementById("logoutDropdownLink");
const favouritesLink = document.getElementById("favouritesLink");

/**
 * Toggles the dropdown menu visibility
 */
function toggleMenuDropdown() {
  const menu = document.getElementById('dropdownMenu');
  const menuButton = document.querySelector('.menu-wrapper');
  menu.classList.toggle('open');
  menuButton.classList.toggle('filled');

  // Fix for browser reflow
  if (!menu.classList.contains('open')) {
    void menu.offsetWidth;
  }
}

/**
 * Opens the login popup modal
 */
function openPopup() {
  popup.classList.add("open-popup");
  overlay.style.display = "block";
}

/**
 * Closes the login popup modal
 */
function closePopup() {
  popup.classList.remove("open-popup");
  overlay.style.display = "none";
}

/**
 * Close popup when clicking outside
 */
window.addEventListener("click", function(event) {
  if (event.target === overlay) {
    closePopup();
  }
});

/**
 * Handles login button click and validates input
 */
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

/**
 * Updates dropdown links based on login state
 */
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

/**
 * Logs user out and clears stored data
 */
function logout() {
  isLoggedIn = false;
  localStorage.removeItem("isLoggedIn");
  updateDropdownLinks();
  alert("You have been logged out.");
}

/**
 * Check login status on page load
 */
window.addEventListener("DOMContentLoaded", () => {
  isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  updateDropdownLinks();
});

// Initialize map
const map = L.map('map').setView([14.1570, 120.9150], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Sample eateries data
const eateries = [
  { name: "Rico's Lechon Manok", latlng: [14.1570, 120.9150], address: "Near CvSU Main Gate" },
  { name: "Mang Inasal", latlng: [14.1585, 120.9180], address: "Along Gov. Dr. C. Trinidad Ave" },
  { name: "Kuya J Burguer ni Juan", latlng: [14.1565, 120.9170], address: "In front of CvSU Gym" },
  { name: "Home.", latlng: [43.4519831, 142.8197834], address: "Near LSHS." }
];

// Create tooltip element
const tooltip = L.DomUtil.create('div', 'marker-tooltip');

// Add markers with tooltips
eateries.forEach((eatery, index) => {
  const marker = L.marker(eatery.latlng).addTo(map);
  marker.bindPopup(`<strong>${eatery.name}</strong><br>${eatery.address}`);

  setTimeout(() => {
    marker.getElement().style.transform = 'scale(1)';
  }, index * 300); // Staggered appearance

  // Tooltip on hover
  marker.on('mouseover', function (e) {
    const pos = L.DomEvent.getMousePosition(e.originalEvent, map.getContainer());
    tooltip.innerHTML = `<strong>${eatery.name}</strong><br><small>${eatery.address}</small>`;
    tooltip.style.left = (pos.x + 15) + 'px';
    tooltip.style.top = (pos.y + 15) + 'px';
    tooltip.style.opacity = 1;
    map.getContainer().appendChild(tooltip);
  });

  marker.on('mouseout', function () {
    tooltip.style.opacity = 0;
  });

  marker.on('mousemove', function (e) {
    const pos = L.DomEvent.getMousePosition(e.originalEvent, map.getContainer());
    tooltip.style.left = (pos.x + 15) + 'px';
    tooltip.style.top = (pos.y + 15) + 'px';
  });
});