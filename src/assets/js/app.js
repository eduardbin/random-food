import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
// require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

import './lib/slick.min.js';
// import './App.vue';

// new Vue({
// 	el: '#catalog',
// 	template: '<App/>',
// 	components: { App },
// });

$(document).foundation();


'use strict';
//Create and functional map in index-page
let deliveryMap;

window.addEventListener('load', initDeliveryMap);

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