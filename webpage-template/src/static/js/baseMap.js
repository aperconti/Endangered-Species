// Create info Div in topright corner
var info = L.control({ position: 'topright' });
var div = L.DomUtil.create('div', 'info');
var opacity = .8

var map = L.map('map', {
    scrollWheelZoom: false
}).setView([37.8, -96], 4);


// Plant Marker Layer Initialization
let densityLayer;

// Listener for toggling on/off plants layer
$("#densityLayer").click(function () {
    if ($("#densityLayer").hasClass("active")) {
        $("#densityLayer").removeClass("active");
        map.removeLayer(densityLayer);
    } else {
        $("#densityLayer").addClass("active");
        getAndPlotDensity();
    }
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + API_KEY, {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

function getColor(d) {
    return d > 1000 ? '#0A2F51' :
        d > 500 ? '#0E4D64' :
            d > 200 ? '#137177' :
                d > 100 ? '#188977' :
                    d > 50 ? '#39A96B' :
                        d > 20 ? '#99D492' :
                            d > 10 ? '#BFE1B0' :
                                '#DEEDCF';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: opacity
    };
}

// population data
function getAndPlotDensity() {
    jQuery.get("/api/population", function (data) {
        densityLayer = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    });
}
// Default to having the base layer on
getAndPlotDensity();

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: .3
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    // create the control
    info.onAdd = function (map) {
        div.innerHTML = '<h4>US Population Density</h4>' + (e.target.feature.properties ?
            '<b>' + e.target.feature.properties.name + '</b><br />' + e.target.feature.properties.density + ' people / mi<sup>2</sup>'
            : 'Hover over a state');
        return div;
    };

    info.addTo(map);
}

function resetHighlight(e) {
    densityLayer.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


// Legend & attribution layers
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<svg class="bd-placeholder-img rounded mr-2" width="15" height="15" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect opacity="' + opacity + '" width="100%" height="100%" fill="' + getColor(from + 1) + '"></rect></svg> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);
map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

// Toggle zoom on map based on click
map.on('click', function () {
    if (map.scrollWheelZoom.enabled()) {
        map.scrollWheelZoom.disable();
    }
    else {
        map.scrollWheelZoom.enable();
    }
});
