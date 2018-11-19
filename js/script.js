$(function() {

	const model = {
		cats: [
			{name: "Meow", clicks: 0, image:"./img/meow.jpg"},
			{name: "Mingau", clicks: 0, image:"./img/mingau.jpg"},
			{name: "Garfield", clicks: 0, image:"./img/garfield.jpg"},
			{name: "Thomas", clicks: 0, image:"./img/thomas.jpg"},
			{name: "Fulano", clicks: 0, image:"./img/fulano.jpg"},
			{name: "Mickey", clicks: 0, image:"./img/mickey.jpg"},
			{name: "Marlon", clicks: 0, image:"./img/marlon.jpg"},
			{name: "Persian", clicks: 0, image:"./img/persian.jpg"}
		],
		clickCount: function(index) {
			this.cats[index].clicks += 1;
		}
	};

	const listView = {
		init: function() {
			this.render();
		},
		render: function() {
			const cats = octopus.getCats();
			$('#list-of-cats').text('');
			cats.forEach( function(cat, index) {
				const listItem = document.createElement('li');
				const catName = document.createElement('h2');
				catName.innerHTML = cat.name;
				const catImage = document.createElement('img');
				catImage.src = cat.image;
				listItem.append(catName);
				listItem.append(catImage);
				$('#list-of-cats').append(listItem);

				listItem.addEventListener('click', function() {
					octopus.listItemClick(index);
				});
			});
		}
	};

	const selectView = {
		render: function(index) {
			$('#cat-selected-container').text('');
			const cat = octopus.getCat(index)
			const container = document.createElement('div');
			const catName = document.createElement('h2');
			const catImage = document.createElement('img');
			const clickCounter = document.createElement('span');
			const admButton = document.createElement('button');
			container.setAttribute('id', 'selected-container');
			catName.innerHTML = cat.name;
			catImage.src = cat.image;
			clickCounter.innerHTML = 'Clicks: ' + cat.clicks;
			container.append(catName);
			container.append(catImage);
			container.append(clickCounter);
			$('#cat-selected-container').append(container);
			admButton.innerHTML = 'Edit cat';
			admButton.classList.add('adm-button');
			$('#cat-selected-container').append(admButton);

			container.addEventListener('click', function(e) {
				octopus.clickCount(index);
			});

			admButton.addEventListener('click', function(e) {
				octopus.showEditArea(index);
				admButton.style.display = 'none';
			});
		}
	};

	const editView = {
		show: function(index) {
			const cat = octopus.getCat(index);
			const container = document.createElement('form');
			const inputName = document.createElement('input');
			const nameLabel = document.createElement('label');
			inputName.setAttribute('value', cat.name);
			nameLabel.innerHTML = 'Name:';
			nameLabel.append(inputName);
			const inputImage = document.createElement('input');
			inputImage.setAttribute('value', cat.image);
			const imageLabel = document.createElement('label');
			imageLabel.innerHTML = 'Image URL:';
			imageLabel.append(inputImage);
			const inputClicks = document.createElement('input');
			inputClicks.setAttribute('value', cat.clicks);
			const clicksLabel = document.createElement('label');
			clicksLabel.innerHTML = 'Clicks:';
			clicksLabel.append(inputClicks);
			const saveButton = document.createElement('button');
			saveButton.classList.add('save-button');
			saveButton.innerHTML = 'Save changes';
			const cancelButton = document.createElement('button');
			cancelButton.classList.add('cancel-button');
			cancelButton.innerHTML = 'cancel';
			container.append(nameLabel);
			container.append(imageLabel);
			container.append(clicksLabel);
			container.append(saveButton);
			container.append(cancelButton);
			$('#cat-selected-container').append(container);

			saveButton.addEventListener('click', function(e) {
				const newCat = {name: inputName.value, clicks: inputClicks.value, image: inputImage.value};
				editView.saveChanges(index, newCat);
				e.preventDefault();
			});

			cancelButton.addEventListener('click', function(e) {
				octopus.cancelEdit(index);
				e.preventDefault();
			});
		},
		saveChanges: function(index, cat) {
			octopus.editCat(index,cat);
		}
	};

	const octopus = {
		init: function() {
			listView.init();
		},
		getCat: function(index) {
			return model.cats[index];
		},
		getCats: function() {
			return model.cats;
		},
		clickCount: function(index) {
			model.clickCount(index);
			selectView.render(index);
		},
		listItemClick: function(index) {
			selectView.render(index);
		},
		showEditArea: function(index) {
			editView.show(index);
		},
		editCat: function(index, cat) {
			model.cats[index].name = cat.name;
			model.cats[index].clicks = cat.clicks;
			model.cats[index].image = cat.image;
			selectView.render(index);
			listView.render();
		},
		cancelEdit: function(index) {
			selectView.render(index);
		}
	};

	octopus.init();
});