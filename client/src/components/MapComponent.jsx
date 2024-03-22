// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = ({
//   className = "absolute z-10 w-full h-screen overflow-hidden",
//   vendors,
//   searchedFoodLocation,
// }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     let map = null;

//     if (!mapRef.current) {
//       map = L.map("map").setView([19.7515, 75.7139], 8); // Centered around Maharashtra
//       mapRef.current = map;

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);
//     } else {
//       map = mapRef.current;
//     }

//     // Remove existing markers before rendering new ones
//     map.eachLayer((layer) => {
//       if (layer instanceof L.Marker) {
//         map.removeLayer(layer);
//       }
//     });

//     // Render markers for vendors with cool animation
//     vendors.forEach((vendor) => {
//       const [lat, lng] = vendor.location;
//       console.log(lat, lng);
//       const marker = L.marker([lat, lng]).addTo(map);
//       console.log("this is marker",marker);

//       const popup = L.popup({ closeButton: false }).setContent(
//         `<b>${vendor.shopname}</b><br>${vendor.name}`
//       );
//       marker.bindPopup(popup);

//       // Zoom to the marker location and show popup on click
//       marker.on("click", function (e) {
//         map.flyTo([lat, lng], 15, { duration: 2, easeLinearity: 0.5 }); // Smooth animation to the clicked marker's location
//         marker.openPopup(); // Show the popup
//       });
//     });

//     // Zoom to the searched food location with smooth animation
//     if (searchedFoodLocation) {
//       const [searchedLat, searchedLng] = searchedFoodLocation;
//       map.flyTo([searchedLat, searchedLng], 14, { duration: 2, easeLinearity: 0.5 }); // Smooth animation for 2 seconds with ease effect

//       // Add a marker for the searched food location
//       const foodMarker = L.marker([searchedLat, searchedLng]).addTo(map);
//       const foodPopup = L.popup({ closeButton: false }).setContent(
//         "Searched Food Location"
//       );
//       foodMarker.bindPopup(foodPopup).openPopup();
//     }

//     return () => {
//       // No cleanup needed
//     };
//   }, [vendors, searchedFoodLocation]);

//   return <div id="map" className={className} />;
// };

// export default MapComponent;



import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  className = "absolute z-10 w-full h-screen overflow-hidden",
  vendors,
  searchedFoodLocation,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    let map = null;

    if (!mapRef.current) {
      map = L.map("map").setView([19.7515, 75.7139], 8); // Centered around Maharashtra
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    } else {
      map = mapRef.current;
    }

    // Remove existing markers before rendering new ones
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Render markers for vendors with cool animation
    vendors.forEach((vendor) => {
      const { latitude, longitude, shopname, name } = vendor;

      const marker = L.marker([latitude, longitude]).addTo(map);

      const popup = L.popup({ closeButton: false }).setContent(
        `<b>${shopname}</b><br>${name}`
      );
      marker.bindPopup(popup);

      // Zoom to the marker location and show popup on click
      marker.on("click", function (e) {
        map.flyTo([latitude, longitude], 15, { duration: 2, easeLinearity: 0.5 }); // Smooth animation to the clicked marker's location
        marker.openPopup(); // Show the popup
      });
    });

    // Zoom to the searched food location with smooth animation
    if (searchedFoodLocation) {
      const [searchedLat, searchedLng] = searchedFoodLocation;
      map.flyTo([searchedLat, searchedLng], 14, { duration: 2, easeLinearity: 0.5 }); // Smooth animation for 2 seconds with ease effect

      // Add a marker for the searched food location
      const foodMarker = L.marker([searchedLat, searchedLng]).addTo(map);
      const foodPopup = L.popup({ closeButton: false }).setContent(
        "Searched Food Location"
      );
      foodMarker.bindPopup(foodPopup).openPopup();
    }

    return () => {
      // No cleanup needed
    };
  }, [vendors, searchedFoodLocation]);

  return <div id="map" className={className} />;
};

export default MapComponent;
