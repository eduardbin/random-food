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
function showNewMenu(mainFood, dessertFood, drinkFood) {
	let menuTmplt = document.querySelector('[data-tmplt-card]').innerHTML;
	let allPrice = 0;
	let allMass = 0;
	let notChecket = 'Не выбрано';
	let notChecketImg = 'assets/img/intro_bg.jpg';

	if (mainFood != undefined) {
		allPrice = allPrice + +mainFood.foodPrice;
		allMass = allMass + +mainFood.foodMass;
	};

	if (dessertFood != undefined) {
		allPrice = allPrice + +dessertFood.foodPrice;
		allMass = allMass + +dessertFood.foodMass;
	};

	if (drinkFood != undefined) {
		allPrice = allPrice + +drinkFood.foodPrice;
		allMass = allMass + +drinkFood.foodMass;
	};



	let newMenu = menuTmplt
		.replace(/{}allPrice{}/ig, allPrice)
		.replace(/{}allMass{}/ig, allMass);

	if (mainFood != undefined) {
		newMenu = newMenu
			.replace(/{}mainImg{}/ig, mainFood.foodImg)
			.replace(/{}mainName{}/ig, mainFood.foodName)
			.replace(/{}mainPrice{}/ig, mainFood.foodPrice)
			.replace(/{}mainMass{}/ig, mainFood.foodMass)
			.replace(/{}mainIngredients{}/ig, mainFood.foodIngredients);
	} else {
		newMenu = newMenu
			.replace(/{}mainImg{}/ig, notChecketImg)
			.replace(/{}mainName{}/ig, notChecket)
			.replace(/{}mainPrice{}/ig, notChecket)
			.replace(/{}mainMass{}/ig, notChecket)
			.replace(/{}mainIngredients{}/ig, notChecket);
	};

	if (dessertFood != undefined) {
		newMenu = newMenu
			.replace(/{}dessertImg{}/ig, dessertFood.foodImg)
			.replace(/{}dessertName{}/ig, dessertFood.foodName)
			.replace(/{}dessertPrice{}/ig, dessertFood.foodPrice)
			.replace(/{}dessertMass{}/ig, dessertFood.foodMass)
			.replace(/{}dessertIngredients{}/ig, dessertFood.foodIngredients);
	} else {
		newMenu = newMenu
			.replace(/{}dessertImg{}/ig, notChecketImg)
			.replace(/{}dessertName{}/ig, notChecket)
			.replace(/{}dessertPrice{}/ig, notChecket)
			.replace(/{}dessertMass{}/ig, notChecket)
			.replace(/{}dessertIngredients{}/ig, notChecket);
	};

	if (drinkFood != undefined) {
		newMenu = newMenu
			.replace(/{}drinkImg{}/ig, drinkFood.foodImg)
			.replace(/{}drinkName{}/ig, drinkFood.foodName)
			.replace(/{}drinkPrice{}/ig, drinkFood.foodPrice)
			.replace(/{}drinkMass{}/ig, drinkFood.foodMass)
			.replace(/{}drinkIngredients{}/ig, drinkFood.foodIngredients);
	} else {
		newMenu = newMenu
			.replace(/{}drinkImg{}/ig, notChecketImg)
			.replace(/{}drinkName{}/ig, notChecket)
			.replace(/{}drinkPrice{}/ig, notChecket)
			.replace(/{}drinkMass{}/ig, notChecket)
			.replace(/{}drinkIngredients{}/ig, notChecket);
	};


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