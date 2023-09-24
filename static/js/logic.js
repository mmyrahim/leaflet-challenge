// api endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// determine marker size based on magnitude
function markerSize(magnitude) {
    return magnitude * 5;
}

// determine marker color based on depth
function depthColor(depth) {
    if (depth < 10) return "#98ee00";
    if (depth < 30) return "#d4ee00";
    if (depth < 50) return "#eecc00";
    if (depth < 70) return "#ee9c00";
    if (depth < 90) return "#ea822c";
    return "#ea2c2c";
}

// set up the base streetmap layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

// create the map
var myMap = L.map("map", {
    center: [37.77, -122.42],
    zoom: 5,
    layers: [streetmap]
});

// fetch earthquake data, set marker size and color, and add detailed popups
d3.json(queryUrl).then(function(data) {
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: depthColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><p>Magnitude: " + feature.properties.mag + 
            "<br>Depth: " + feature.geometry.coordinates[2] + "</p>");
        }
    }).addTo(myMap);

    // add a legend to explain depth colors
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [-10, 10, 30, 50, 70, 90];

        // create labels with colored squares for each depth interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + depthColor(grades[i] + 1) + '; width: 10px; height: 10px; float: left; margin-right: 5px;"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+') + '<br>';
        }

        return div;
    };
    
    // attach the legend to the map
    legend.addTo(myMap);
});
