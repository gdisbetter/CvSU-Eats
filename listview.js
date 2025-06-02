
function toggleMenuDropdown() {
  const menu = document.getElementById('dropdownMenu');
  const menuButton = document.querySelector('.menu-wrapper');
  menu.classList.toggle('open');
  menuButton.classList.toggle('filled');
  if (!menu.classList.contains('open')) {
    void menu.offsetWidth;
  }
}
let popup = document.getElementById("boxup");

function openPopup() {
    popup.classList.add("open-boxup")
}
function closePopup() {
    popup.classList.remove("open-boxup")
}