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

import './index-map.js';
import './index-get-user-param.js';
import './cards-randomizer.js';

// slider
$(document).ready(function () {
	$(".ba-food_slider").slick({
		centerMode: true,
		slidesToShow: 1,
		centerPadding: '23%',
		responsive: [
			{
				breakpoint: 1270,
				settings: {
					centerPadding: '15%',
				}
			},
			{
				breakpoint: 1000,
				settings: {
					centerPadding: '10%',
				}
			},
			{
				breakpoint: 865,
				settings: {
					centerMode: false,
				}
			},

		]
	});
});
