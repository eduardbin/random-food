let userForm = document.querySelector('[data-user-form]');
let data = {
	main: null,
	dessert: null,
	drink: null,
	kitchen: null,
};


if (userForm != null) {
	userForm.addEventListener('submit', saveUserParams);

	function saveUserParams(event) {
		event.preventDefault();

		data.main = userForm.elements.main.checked;
		data.dessert = userForm.elements.dessert.checked;
		data.drink = userForm.elements.drink.checked;
		data.kitchen = userForm.elements.kitchen.value;

		for (let elem in data) {
			localStorage.setItem(`${elem}`, `${data[elem]}`);
		};

		window.location.assign('./cards.html');
	};
};