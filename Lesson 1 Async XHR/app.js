(function() {
	const form = document.querySelector('#search-form');
	const searchField = document.querySelector('#search-keyword');
	let searchedForText;
	const responseContainer = document.querySelector('#response-container');

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		responseContainer.innerHTML = '';
		searchedForText = searchField.value;

		const imgRequest = new XMLHttpRequest();
		imgRequest.onload = addImage;
		imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		imgRequest.setRequestHeader('Authorization', 'Client-ID d2b2e1f50af114489403ce32f26db28978ed132d7191767ed5e20c75e231bb8c');
		imgRequest.send();

		const articleRequest = new XMLHttpRequest();
		articleRequest.onload = addArticles;
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=742d13057dac4a169545d9a2a16d66ef`);
		articleRequest.send();
	});

	function addImage() {
		const data = JSON.parse(this.responseText);
		const firstImage = data.results[0];

		responseContainer.insertAdjacentHTML('afterbegin', `<figure>
				<img src="${firstImage.urls.small}" alt="${searchedForText}">
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`
		);
	}

	function addArticles() {
		const data = JSON.parse(this.responseText);
		const articlesInHTML = data.response.docs.map(article => `<li>
					<h2><a href="${article.web_url}">${article.headline.main}</a><h2>
					<p>${article.snippet}</p>
				</li>`
			);

		responseContainer.insertAdjacentHTML('beforeend', `<ul>${articlesInHTML.join('')}</ul>`);
	}
})();