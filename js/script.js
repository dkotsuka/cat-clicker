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
			container.setAttribute('id', 'selected-container');
			catName.innerHTML = cat.name;
			catImage.src = cat.image;
			clickCounter.innerHTML = 'Clicks: ' + cat.clicks;
			container.append(catName);
			container.append(catImage);
			container.append(clickCounter);
			$('#cat-selected-container').append(container);

			container.addEventListener('click', function(e) {
				octopus.clickCount(index);
			});
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
		}
	};

	octopus.init();
});