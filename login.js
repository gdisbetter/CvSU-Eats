function toggleMenuDropdown() {
  const menu = document.getElementById('dropdownMenu');
  const menuButton = document.querySelector('.menu-wrapper');
  menu.classList.toggle('open');
  menuButton.classList.toggle('filled');
  if (!menu.classList.contains('open')) {
    void menu.offsetWidth;
  }
}
let popup = document.getElementById("popup");

function openPopup() {
    popup.classList.add("open-popup")
}
function closePopup() {
    popup.classList.remove("open-popup")
}
