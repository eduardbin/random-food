const url = window.location.pathname;

window.addEventListener('load', () => {
	if (url == '/' || url == '/index.html') {

		'use strict';
		//Create and functional map in index-page
		let deliveryMap;

		initDeliveryMap();
		function initDeliveryMap() {
			// The location of mapCenter
			let cities = {
				poltava: { lat: 49.592232, lng: 34.545601 },
			};

			let mapCenter = cities.poltava;

			//map-options
			deliveryMap = new google.maps.Map(document.querySelector('.ed-delivery__map'), {
				center: mapCenter,
				zoom: 12,
				disableDefaultUI: true,
			});

			//move mapCenter on select change
			// let citySelect = document.querySelector('*input-select-data-atribute*');

			// citySelect.addEventListener('change', () => {
			// 	let city = citySelect.value;
			// 	let newCoords = cities[city];

			// 	deliveryMap.setCenter(newCoords);
			// });

			//try map with geolocation while we dont use city-list in header or
			navigator.geolocation.getCurrentPosition(function (position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				deliveryMap.setCenter(pos);
			});
		};

	} else return;
});
