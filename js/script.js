const cats = [{name: "Meow", clicks: 0, image:"./img/meow.jpg"},
	{name: "Mingau", clicks: 0, image:"./img/mingau.jpg"},
	{name: "Garfield", clicks: 0, image:"./img/garfield.jpg"},
	{name: "Thomas", clicks: 0, image:"./img/thomas.jpg"},
	{name: "Fulano", clicks: 0, image:"./img/fulano.jpg"},
	{name: "Mickey", clicks: 0, image:"./img/mickey.jpg"},
	{name: "Marlon", clicks: 0, image:"./img/marlon.jpg"},
	{name: "Persian", clicks: 0, image:"./img/persian.jpg"}];

cats.forEach( function(element, index) {
	$('#list-of-cats').append(`<li class="container" id="cat${element.name}">
		<h2 class="cat-name">${element.name}</h2>
		<img src=${element.image}>
		<p class="counter" id="click${element.name}">Clicks: ${element.clicks}</p>
	</li>`);

	$(`#cat${element.name}`).click(function(event) {
		return handleClick(index);
	});
});

function handleClick(index) {
	$('#cat-selected-container').text("");
 	$('#cat-selected-container').append(`<div id="selected-container" class="container">
		<h2 class="cat-name">${cats[index].name}</h2>
		<img src=${cats[index].image}>
		<p class="counter" id="clickS${cats[index].name}">Clicks: ${cats[index].clicks}</p>
	</div>`);

	$('#selected-container').click(function (event) {
		cats[index].clicks += 1;
		$("#clickS" + cats[index].name).text(`Clicks: ${cats[index].clicks}`);
		$("#click" + cats[index].name).text(`Clicks: ${cats[index].clicks}`);
	})
}
 