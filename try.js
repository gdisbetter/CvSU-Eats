const map = L.map('map').setView([51.508742, -0.120850], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const eateries = [
  {
    name: "The Coffee Spot",
    position: [51.508742, -0.120850],
    shortDescription: "A cozy cafe with coffee and pastries.",
    image: "https://via.placeholder.com/250x150?text=Coffee+Spot",
    details: `
      <h2>The Coffee Spot</h2>
      <p><strong>Full Description:</strong> A cozy and relaxing place offering premium coffee, hand-made pastries, and free WiFi.</p>
      <p><strong>Opening Hours:</strong> 7am - 8pm</p>
      <p><strong>Contact:</strong> (123) 456-7890</p>
    `
  }
];

const detailsPanel = document.getElementById('details-panel');
const detailsContent = document.getElementById('details-content');

function openDetails(htmlContent) {
  detailsContent.innerHTML = htmlContent;
  detailsPanel.classList.add('open');
}

eateries.forEach(eatery => {
  const popupContent = `
    <div class="popup-content">
      <h3>${eatery.name}</h3>
      <p>${eatery.shortDescription}</p>
      <img src="${eatery.image}" alt="${eatery.name}">
      <button class="expand-btn" onclick='openDetails(${JSON.stringify(eatery.details)})'>Expand Details</button>
    </div>
  `;

  const marker = L.marker(eatery.position).addTo(map);
  marker.bindPopup(popupContent);
});

map.on('click', () => {
  detailsPanel.classList.remove('open');
});

window.openDetails = openDetails;
