let isLoggedIn = false;

function toggleMenuDropdown() {
  const menu = document.getElementById('dropdownMenu');
  const menuButton = document.querySelector('.menu-wrapper');
  menu.classList.toggle('open');
  menuButton.classList.toggle('filled');

  if (!menu.classList.contains('open')) {
    void menu.offsetWidth; // reflow
  }
}

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}

// Optional: Close popup when clicking outside
window.addEventListener("click", function(event) {
  if (event.target === popup) {
    closePopup();
  }
});

// Optional: Add basic validation for login
document.getElementById("loginBtn").addEventListener("click", function(e) {
  const studentNumber = document.querySelectorAll("input")[0].value.trim();
  const password = document.querySelectorAll("input")[1].value.trim();

  if (!studentNumber || !password) {
    alert("Please enter both Student Number and Password.");
    e.preventDefault(); // Stop form submission
  } else {
    alert("Logging in...");
    closePopup();
    // You can redirect or send data here
  }
});


document.getElementById("loginBtn").addEventListener("click", function(e) {
  const studentNumber = document.querySelectorAll("input")[0].value.trim();
  const password = document.querySelectorAll("input")[1].value.trim();

  if (!studentNumber || !password) {
    alert("Please enter both Student Number and Password.");
    e.preventDefault(); // Stop form submission
  } else {
    isLoggedIn = true; // Set login state to true
    closePopup();
    updateDropdownLinks(); // Show logout and favourites
    alert("Logging in...");
  }
});

function updateDropdownMenu() {
  const favouritesLink = document.getElementById("favouritesLink");
  if (isLoggedIn) {
    favouritesLink.style.display = "flex"; // Or "block" depending on layout
  } else {
    favouritesLink.style.display = "none";
  }
}
function updateDropdownLinks() {
  const loginLink = document.getElementById("loginDropdownLink");
  const logoutLink = document.getElementById("logoutDropdownLink");
  const favouritesLink = document.getElementById("favouritesLink");

  if (isLoggedIn) {
    loginLink.style.display = "none";
    logoutLink.style.display = "flex";
    favouritesLink.style.display = "flex";
  } else {
    loginLink.style.display = "block"; // or "flex"
    logoutLink.style.display = "none";
    favouritesLink.style.display = "none";
  }
}
function logout() {
  isLoggedIn = false; // Reset login state
  updateDropdownLinks(); // Hide logout and show login
  alert("You have been logged out.");
}