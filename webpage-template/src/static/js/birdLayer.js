// Plant Marker Layer Initialization
let birdMarkers;

// Listener for toggling on/off plants layer
$("#birdLayer").click(function () {
    if ($("#birdLayer").hasClass("active")) {
        $("#birdLayer").removeClass("active");
        map.removeLayer(birdMarkers);
    } else {
        $("#birdLayer").addClass("active");
        getAndPlotBirds();
    }
});

let birdIcon = L.icon({
    iconUrl: "/static/images/bird-pin.png",
    iconSize:     [25, 30], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -10] // point from which the popup should open relative to the iconAnchor
});

//bird json data
function getAndPlotBirds() {
    if (birdMarkers == null) {
        birdMarkers = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
        });

        jQuery.get("/api/birds", function (data) {
            // Create a new marker cluster group
            birdData = data.bird_data
            for (var i = 0; i < birdData.length; i++) {
                var bird = birdData[i];
                var location = [bird.Lat, bird.Long]
                birdMarkers.addLayer(
                    L.marker(location, {icon: birdIcon})
                        .bindPopup("<h4> Bird Name: " + bird["Species Name"] + "</h4> <hr> <h5> Protected Habitat: " + bird["Unit Name"] + "</h5><br><h5> Federal Status: " + bird["Federal Status"] + "</h5>")
                );
            }
        });
    }
    map.addLayer(birdMarkers);
}
