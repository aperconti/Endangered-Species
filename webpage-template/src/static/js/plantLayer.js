// Plant Marker Layer Initialization
let plantMarkers;

// Listener for toggling on/off plants layer
$("#plantsLayer").click(function () {
    if ($("#plantsLayer").hasClass("active")) {
        $("#plantsLayer").removeClass("active");
        map.removeLayer(plantMarkers);
    } else {
        $("#plantsLayer").addClass("active");
        getAndPlotPlants();
    }
});

let flowerIcon = L.icon({
    iconUrl: "/static/images/flower-pin.png",
    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -10] // point from which the popup should open relative to the iconAnchor
});

//plant json data
function getAndPlotPlants() {
    if (plantMarkers == null) {
        plantMarkers = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
        });

        jQuery.get("/api/plants", function (data) {
            // Create a new marker cluster group
            plantData = data.plant_data
            for (var i = 0; i < plantData.length; i++) {
                var plant = plantData[i];
                var location = [plant.Lat, plant.Long]
                plantMarkers.addLayer(
                    L.marker(location, {icon: flowerIcon})
                        .bindPopup("<h4> Plant Name: " + plant["Species Name"] + "</h4> <hr> <h5> Federal Status: " + plant["Federal Status"] + "</h5>")
                );
            }
        });
    }
    map.addLayer(plantMarkers);
}
