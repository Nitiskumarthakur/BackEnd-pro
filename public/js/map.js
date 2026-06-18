
//    async function getCoordinates(location) {
//    const response = await fetch(
//     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
//    );

//    const data = await response.json();
//    console.log(data);


// //    if (data.length > 0) {
// //     return {
// //       lat: data[0].lat,
// //       lng: data[0].lon,
// //     };
// //    }
//   }
//   getCoordinates("Patna, Bihar")
//   res.send("done");




const map = L.map('map').setView([28.958, 77.635], 13);

if(map){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}
