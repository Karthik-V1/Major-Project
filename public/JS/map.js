// mapboxgl.accessToken = mapToken;
// const geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: {
//         imageId: 1011,
//         iconSize: [60, 60],
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [listing.geometry.coordinates],
//       },
//     },
//   ],
// };

mapboxgl.accessToken = mapToken;
// console.log(mapToken);
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 12, // starting zoom
});

console.log(listing.geometry.coordinates);

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ closeOnClick: false }).setHTML(
      `<h4>${listing.location}</h4><P>Exact location will be provided after booking</P>`
    )
  )
  .addTo(map);

// // Add markers to the map.
// for (const marker of geojson.features) {
//   // Create a DOM element for each marker.
//   const el = document.createElement("div");
//   const width = marker.properties.iconSize[0];
//   const height = marker.properties.iconSize[1];
//   el.className = "marker";
//   el.style.backgroundImage = `https://picsum.photos/id/${marker.properties.imageId}/${width}/${height})`;
//   el.style.width = `${width}px`;
//   el.style.height = `${height}px`;
//   el.style.backgroundSize = "100%";

// // el.addEventListener("click", () => {
// //   window.alert(marker.properties.message);
// // });

// // Add markers to the map.
//   new mapboxgl.Marker(el)
//     .setLngLat(marker.geometry.coordinates)
//     .setPopup(
//       new mapboxgl.Popup({ closeOnClick: false }).setHTML(
//         `<h4>${listing.location}</h4><P>Exact location will be provided after booking</P>`
//       )
//     )
//     .addTo(map);
// }

// Add the control to the map.
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);
