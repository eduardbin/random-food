let anotherMenuButton = document.querySelector('[data-get-new-menu]');
let fetchUrl = "assets/db/food.json";
let foodData;
let restaurantLogoURL;
let mainFood;
let drinkFood;
let dessertFood;

if (anotherMenuButton != null) {
	anotherMenuButton.addEventListener('click', getJSON);
	window.addEventListener('load', getJSON)
};

function getNewMenu() {

	if (localStorage.kitchen == 'all') {
		foodData = [...foodData.european, ...foodData.asian, ...foodData.ukrainian];
	} else {
		foodData = [...foodData[localStorage.kitchen]];
	};

	foodData = foodData[getRandom(foodData.length)];

	restaurantLogoURL = foodData.restaurantLogo;

	if (localStorage.main == 'true') {
		mainFood = foodData.main[getRandom(foodData.main.length)];
	};

	if (localStorage.dessert == 'true') {
		dessertFood = foodData.dessert[getRandom(foodData.dessert.length)];
	};

	if (localStorage.drink == 'true') {
		drinkFood = foodData.drink[getRandom(foodData.drink.length)];
	};

	showNewMenu(mainFood, dessertFood, drinkFood);
};

function getJSON() {
	fetch(fetchUrl)
		.then(response => response.json())
		.then(response => {
			foodData = response;
			getNewMenu();
		});
};

function getRandom(maxNumber) {
	let randomNumber = Math.floor(Math.random() * maxNumber);
	return randomNumber;
};


// show menu in cards

//Get li tmplt from html
let menuTmplt = document.querySelector('[data-tmplt-card]').innerHTML;
let menuBar = document.querySelector('[data-menu]');

function showNewMenu(mainFood, dessertFood, drinkFood) {
	let allPrice = +mainFood.foodPrice + +dessertFood.foodPrice + +drinkFood.foodPrice;
	let allMass = +mainFood.foodMass + +dessertFood.foodMass + +drinkFood.foodMass;

	let newMenu = menuTmplt
		.replace(/{}allPrice{}/ig, allPrice)
		.replace(/{}allMass{}/ig, allMass)
		.replace(/{}mainImg{}/ig, mainFood.foodImg)
		.replace(/{}mainName{}/ig, mainFood.foodName)
		.replace(/{}mainPrice{}/ig, mainFood.foodPrice)
		.replace(/{}mainMass{}/ig, mainFood.foodMass)
		.replace(/{}mainIngredients{}/ig, mainFood.foodIngredients)
		.replace(/{}drinkImg{}/ig, drinkFood.foodImg)
		.replace(/{}drinkName{}/ig, drinkFood.foodName)
		.replace(/{}drinkPrice{}/ig, drinkFood.foodPrice)
		.replace(/{}drinkMass{}/ig, drinkFood.foodMass)
		.replace(/{}drinkIngredients{}/ig, drinkFood.foodIngredients)
		.replace(/{}dessertImg{}/ig, dessertFood.foodImg)
		.replace(/{}dessertName{}/ig, dessertFood.foodName)
		.replace(/{}dessertPrice{}/ig, dessertFood.foodPrice)
		.replace(/{}dessertMass{}/ig, dessertFood.foodMass)
		.replace(/{}dessertIngredients{}/ig, dessertFood.foodIngredients);

	setSlider(newMenu);
	tabFunction();
};

//tabs
function tabFunction() {
	//tab sections
	let tabItems = document.querySelectorAll('.tab-item');
	let tabSections = document.querySelectorAll('.ed-section');

	for (let tabItem of tabItems) {
		tabItem.addEventListener('click', (event) => event.preventDefault());
		tabItem.addEventListener('click', tabSection);
	};

	function tabSection() {
		let clickedItem = this;

		let sections = getSelectedSection(clickedItem);
		hideAllSections();
		showSelectedSection(sections);
	};

	function getSelectedSection(clickedItem) {
		let itemId = clickedItem.hash;
		return document.querySelectorAll(`[data-id="${itemId}"]`);
	};

	function hideAllSections() {
		for (let tabSection of tabSections) {
			tabSection.hidden = true;
		};
	};

	function showSelectedSection(sections) {
		for (let section in sections) {
			sections[section].hidden = false;
		};
	};

	//tab styles
	let navItems = document.querySelectorAll('.ba-nav__item');

	for (let navItem of navItems) {
		navItem.addEventListener('click', activeItem);
	};

	function activeItem() {
		let clickedItem = this;

		removeAllActiveClasses();
		addActiveClass(clickedItem);
	};

	function removeAllActiveClasses() {
		for (let navItem of navItems) {
			navItem.classList.remove('active');
		};
	};

	function addActiveClass(clickedItem) {
		clickedItem.classList.add('active');
	};
};

// slider
function setSlider(newMenu) {
	$('.ba-food_slider').slick('slickAdd', `${newMenu}`);
};