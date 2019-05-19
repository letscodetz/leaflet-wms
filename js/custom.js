// create base layer
var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// layers
var drains = L.tileLayer.wms("http://localhost:8080/geoserver/ows", {
    layers: 'cite:mitaro_dar',
    format: 'image/png',
    transparent: true,
});

var states = L.tileLayer.wms("http://localhost:8080/geoserver/ows", {
    layers: 'topp:states',
    format: 'image/png',
    transparent: true,
});

var roads = L.tileLayer.wms("http://localhost:8080/geoserver/ows", {
    layers: 'sf:streams',
    format: 'image/png',
    transparent: true,
});


// create map
map = L.map('mapid', {
    center: [-6.8161, 39.2804],
    zoom: 14
});

// add base layer to map
baseLayer.addTo(map);

// create layer control
L.control.layers({}, {"Drains": drains, "States": states, "Roads": roads}).addTo(map);


// // zoom to selected layer
// map.on('overlayadd', (e) => {
//     map.fitBounds(e.layer);
// });


// WMS get info

function identify(e) {
    console.log(map);
    // set parameters needed for GetFeatureInfo WMS request
    var sw = map.options.crs.project(map.getBounds().getSouthWest());
    var ne = map.options.crs.project(map.getBounds().getNorthEast());
    var BBOX = sw.x + "," + sw.y + "," + ne.x + "," + ne.y;
    var WIDTH = map.getSize().x;
    var HEIGHT = map.getSize().y;
    var X = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).x);
    var Y = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).y);

// compose the URL for the request
    var URL = 'http://localhost:8080/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=cite:mitaro_dar&QUERY_LAYERS=cite:mitaro_dar&BBOX=' + BBOX + '&FEATURE_COUNT=1&HEIGHT=' + HEIGHT + '&WIDTH=' + WIDTH + '&INFO_FORMAT=application%2Fjson&TILED=false&CRS=EPSG%3A3857&I=' + X + '&J=' + Y;

    //send GetFeatureInfo as asynchronous HTTP request using jQuery $.ajax
    $.ajax({
        url: URL,
        dataType: "json",
        type: "GET",
        success: function(data)
        {
            if(data.features.length !== 0) {  // at least one feature returned in response
                var returnedFeature = data.features[0]; // first feature from response

                // Set up popup for clicked feature and open it
                var popup = new L.Popup({
                    maxWidth: 300
                });

                popup.setContent("<b>" + returnedFeature.properties.name + "</b><br />" + returnedFeature.properties.full_id);
                popup.setLatLng(e.latlng);
                map.openPopup(popup);
            }
        }
    });
}

map.addEventListener('click', identify)