let MAP_Token = mapToken;
const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAP_Token}`,
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9
});

const marker = new maplibregl.Marker({color : "red"})
    .setLngLat(listing.geometry.coordinates);
    marker.setPopup(new maplibregl.Popup({offset: 20}).setHTML(
        `<h4>${listing.location}</h4><p>Exact Location Provided after booking</p>`
    ));
    marker.addTo(map);