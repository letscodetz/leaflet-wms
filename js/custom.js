var map = L.map('mapid',).setView([51.505, -0.09], 7);



var attr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
L.tileLayer("http://tile.stamen.com/toner-background/{z}/{x}/{y}.png", {
    opacity: 0.1,
    attribution: attr
}).addTo(map);


var nexrad = L.tileLayer.wms("http://localhost:8080/geoserver/ows", {
    layers: 'topp:states',
    format: 'image/png',
    transparent: true,
}).addTo(map);