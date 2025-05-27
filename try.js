const map = L.map('map').setView([14.2306, 120.9692], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const eatery = {
  name: 'Tapsi ni Mang Juan',
  lat: 14.2311,
  lng: 120.9685,
  description: 'Affordable and tasty silog meals perfect for students!',
  image: 'https://via.placeholder.com/300x200?text=Tapsi+ni+Mang+Juan'
};

const marker = L.marker([eatery.lat, eatery.lng]).addTo(map);

const popupContent = `
  <div class="popup-content">
    <strong>${eatery.name}</strong><br>
    ${eatery.description}<br>
    <img src="${eatery.image}" alt="${eatery.name}" />
    <button class="expand-btn" onclick="expandDetails()">Expand Details</button>
  </div>
`;

marker.bindPopup(popupContent);

function expandDetails() {
  const panel = document.getElementById('details-panel');
  const content = document.getElementById('details-content');
  content.innerHTML = `
    <h2>${eatery.name}</h2>
    <p>${eatery.description}</p>
    <img src="${eatery.image}" alt="${eatery.name}" style="width:100%; border-radius:8px;" />
  `;
  panel.classList.add('open');
}
