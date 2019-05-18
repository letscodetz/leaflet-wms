var map = L.map('mapid',).setView([51.505, -0.09], 7);



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var nexrad = L.tileLayer.wms("http://localhost:8080/geoserver/ows", {
    layers: 'cite:mitaro_dar',
    format: 'image/png',
    transparent: true,
}).addTo(map);