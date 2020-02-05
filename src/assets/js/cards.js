const url = window.location.pathname;

window.addEventListener('load', () => {
	if (url == '/cards.html') {


		$(document).ready(function () {
			$(".ba-food_slider").slick({
				centerMode: true,
				slidesToShow: 1,
				centerPadding: '23%',
			});
		});


	} else return;
});